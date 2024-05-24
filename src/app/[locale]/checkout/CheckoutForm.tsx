"use client";

import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useRouter } from "next/navigation";
import { useState } from "react";



const generateInvoice = (categories: any, totalPrice: number) => {
  const doc = new jsPDF();
  doc.text("Invoice", 20, 10);
  const tableColumn = ["Product", "Size", "Quantity", "Price"];
  const tableRows = categories.map((cart: any) => [
    cart.productId.name,
    cart.productId.size,
    cart.quantity,
    `$${cart.quantity * cart.productId.discountPrice}`,
  ]);
  autoTable(doc, { head: [tableColumn], body: tableRows });
  doc.text(
    `Total: $${totalPrice.toFixed(2)}`,
    20,
    (doc as any).lastAutoTable.finalY + 10
  );
  doc.save("invoice.pdf");
  const pdfBlob = doc.output("blob");
  return URL.createObjectURL(pdfBlob);
};

const CheckoutForm = ({ categories, totalPrice, userId }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    setLoading(true);
    console.log(userId, formValues);
    try {
      // Save user information to Checkout model
      const checkoutResponse = await fetch("/api/saveCheckout", {
        method: "POST",
        body: JSON.stringify({ userId, ...formValues }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Save order to Order model
      console.log(userId, totalPrice, categories);
      const orderResponse = await fetch("/api/saveOrder", {
        method: "POST",
        body: JSON.stringify({ userId, categories, totalPrice }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(checkoutResponse);
      console.log(orderResponse);
      if (checkoutResponse.ok && orderResponse.ok) {
        // Generate and download the invoice
        const invoiceUrl = generateInvoice(categories, totalPrice);
        console.log(formValues.email);

        const response = await fetch("/api/sendEmail", {
          method: "POST",

          body: JSON.stringify({
            to: formValues.email as string,
            subject: "Invoice for Your Purchase",
            text: "Please find attached your invoice for the recent purchase.",
            categories: categories,
            totalPrice: totalPrice,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response);
        // Clear the cart
        const deleteCartResponse = await fetch("/api/deleteCart", {
          method: "POST",
          body: JSON.stringify({ userId }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (deleteCartResponse.ok) {
          // Show success message
          toast.success("Order successfully placed!");

          // Redirect to a success page or clear the form (optional)
          router.push("/");
          router.refresh();
        } else {
          toast.error("Failed to clear the cart. Please try again.");
        }
      } else {
        toast.error("Failed to place the order. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6"
    >
      <div className="col-span-8 border border-gray-200 p-4 rounded">
        <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="text-gray-600">
                First Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="first-name"
                className="input-box"
                required
              />
            </div>
            <div>
              <label htmlFor="last-name" className="text-gray-600">
                Last Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="last-name"
                className="input-box"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="company" className="text-gray-600">
              Company
            </label>
            <input
              type="text"
              name="company"
              id="company"
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="region" className="text-gray-600">
              Country/Region <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="region"
              id="region"
              className="input-box"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="text-gray-600">
              Street address <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="input-box"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="text-gray-600">
              City <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="input-box"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-gray-600">
              Phone number <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="input-box"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-gray-600">
              Email address <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input-box"
              required
            />
          </div>
        </div>
      </div>
      <div className="col-span-4 border border-gray-200 p-4 rounded">
        <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
          Order Summary
        </h4>
        <div className="space-y-2">
          {categories?.map((cart: any) => (
            <div key={cart.id} className="flex justify-between">
              <div>
                <h5 className="text-gray-800 font-medium">
                  {cart.productId.name}
                </h5>
                <p className="text-sm text-gray-600">
                  Size: {cart.productId.size}
                </p>
              </div>
              <p className="text-gray-600">x{cart.quantity}</p>
              <p className="text-gray-800 font-medium">
                ${(cart.quantity * cart.productId.discountPrice).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
          <p>Subtotal</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between text-gray-800 font-medium py-3 uppercase">
          <p className="font-semibold">Total</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex items-center mb-4 mt-2">
          <input
            type="checkbox"
            name="agreement"
            id="agreement"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
            required
          />
          <label
            htmlFor="agreement"
            className="text-gray-600 ml-3 cursor-pointer text-sm"
          >
            I agree to the{" "}
            <a href="#" className="text-primary">
              terms & conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
          disabled={loading}
        >
          {loading ? "Placing order..." : "Place order"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
