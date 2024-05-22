"use client";

import { validateCustomer } from "@/app/zodValidation";
import { registerUser } from "@/db/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
function FormAction() {
  const route = useRouter();
  return (
    <form
      className="login-form"
      action={async (formData) => {
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;
        const name = formData.get("name") as string | undefined;
        const confirmPassword = formData.get("confirmPassword") as
          | string
          | undefined;
        const toastId = toast.loading("Waiting...");
        if (!email || !password || !name || !confirmPassword) {
          toast.error("All fields are required", {
            id: toastId,
          });
          return;
        }
        const result = await validateCustomer({
          email,
          password,
          name,
          confirmPassword,
        });

        if (!result.success) {
          toast.error(result.error.issues[0].message, {
            id: toastId,
          });
        } else {
          const res = await registerUser({
            name: result.data.name,
            email: result.data.email,
            password: result.data.password,
          });
         
          if (!res.success) {
            toast.error(res.message, {
              id: toastId,
            });
          } else if (res.success) {
            toast.success("User Register successfully!", {
              id: toastId,
            });
            route.push("/en/login");
          }
        }
      }}
    >
      <div className="space-y-2">
        <div>
          <label htmlFor="name" className="text-gray-600 mb-2 block">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="fulan fulana"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-gray-600 mb-2 block">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="youremail.@domain.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-gray-600 mb-2 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="*******"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="text-gray-600 mb-2 block">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="*******"
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="agreement"
            id="agreement"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label
            htmlFor="agreement"
            className="text-gray-600 ml-3 cursor-pointer"
          >
            I have read and agree to the{" "}
            <a href="#" className="text-primary">
              terms & conditions
            </a>
          </label>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
        >
          create account
        </button>
      </div>
    </form>
  );
}

export default FormAction;
