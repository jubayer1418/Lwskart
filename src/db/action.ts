"use server";

import { toast } from "sonner";
import { z } from "zod";
import { Customer } from "@/model";
import { dbConnect } from "@/server";
import { formDataSchema } from "@/app/zodValidation/customerSchemaValidator";
import { validateCustomer, validateCustomerLogin } from "@/app/zodValidation";

import { addCartEntry, addWishlistEntry } from "./queries";
import { revalidatePath } from "next/cache";
import { auth, signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

import { redirect } from "next/navigation";

export const handleToWishlist = async (
  customerId: string | undefined,
  productId: string
) => {
  if (!customerId) {
    return;
  }

  await dbConnect();
  const c = await addWishlistEntry(customerId, productId);
  revalidatePath("/en/wishlist");
 
  return c;
};
export const handleToCart = async (
  customerId: string | undefined,
  productId: string,
  quantity: number = 1
) => {
  if (!customerId) {
    // Redirect logic should be handled outside this function
    return;
  }
  await dbConnect();
  const c = await addCartEntry(customerId, productId, quantity);
  revalidatePath("/en/checkout");
  console.log(c);
  return c;
};

export const editAddress = async (
  formData: any,
  email: string | null | undefined
) => {
  const userData = Object.fromEntries(formData);
  console.log(userData); // Optional: Logs the userData object

  try {
    await dbConnect(); // Connect to the database
    const updatedCustomer = await Customer.findOneAndUpdate(
      {
        email,
      },
      userData
    );
    console.log(updatedCustomer);

    // Check if the update was successful
    if (updatedCustomer) {
      revalidatePath("/en/account"); // Update
      console.log("Customer address updated successfully.");
      return {
        success: true,
        message: "Customer address updated successfully",
      };
    } else {
      console.log("Failed to update customer address.");

      return { success: true, message: "fail" };
    }
  } catch (error) {
    console.error("Error updating customer address:", error);
    // Optionally handle the error
  }
  revalidatePath("/en/account");
};
export const registerUser = async (formData: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    await dbConnect();

    // Check if the user already exists
    const existingUser = await Customer.findOne({ email: formData.email });
    if (existingUser) {
      throw new Error("Your email is already registered!");
    }

    // Create the new user
    const result = await Customer.create(formData);

    // Check if the user was created successfully

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
export type FormData = z.infer<typeof formDataSchema>;

export async function login(email: string, password: string) {
  try {
    const res = await validateCustomerLogin({ email, password });
    console.log(res);

    // Perform sign-in
    if (res.success) {
      const response = await signIn("credentials", {
        email: res.data.email,
        password: res.data.password,
        redirect: false,
      });

      return {
        success: true,
        message: "User logged in successfully",
      };
    } else {
      return { success: false, message: res.error.issues[0].message };
    }
  } catch (error) {
    const err = error as CredentialsSignin;

    return {
      success: false,
      message: err.cause,
    };
  }
}
