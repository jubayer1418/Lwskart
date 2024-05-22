
// import { auth } from "@/auth";
// import { editAddress } from "@/db/action";
// import { getAllCartEntries } from "@/db/queries";
// import { dbConnect } from "@/server";
// import { Session } from "next-auth";
// import { redirect } from "next/navigation";
// import Breack from "../../componenets/common/Breack";
// import { toast } from "sonner";

// const Checkout = async () => {
//   const session:Session | null = await auth();
//   if(!session) redirect("/login")

//   await dbConnect();
//   const categories = await getAllCartEntries(session.user?.id as string);

//   const totalPrice = categories.reduce((total: number, order: any) => {
//     return total + order.productId.discountPrice * order.quantity;
//   }, 0);

//   return (
//    <>
//    <Breack>Checkout</Breack>
//    <form
//       action={async (formData: FormData) => {
//         "use server";

//         toast.success("order successfully!")
//         // const message = await editAddress(formData);

//         // console.log(message);
//       }}
//       className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6"
//     >
//       <div className="col-span-8 border border-gray-200 p-4 rounded">
//         <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="first-name" className="text-gray-600">
//                 First Name <span className="text-primary">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 id="first-name"
//                 className="input-box"
//               />
//             </div>
//             <div>
//               <label htmlFor="last-name" className="text-gray-600">
//                 Last Name <span className="text-primary">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 id="last-name"
//                 className="input-box"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="company" className="text-gray-600">
//               Company
//             </label>
//             <input
//               type="text"
//               name="company"
//               id="company"
//               className="input-box"
//             />
//           </div>
//           <div>
//             <label htmlFor="region" className="text-gray-600">
//               Country/Region
//             </label>
//             <input
//               type="text"
//               name="region"
//               id="region"
//               className="input-box"
//             />
//           </div>
//           <div>
//             <label htmlFor="address" className="text-gray-600">
//               Street address
//             </label>
//             <input
//               type="text"
//               name="address"
//               id="address"
//               className="input-box"
//             />
//           </div>
//           <div>
//             <label htmlFor="city" className="text-gray-600">
//               City
//             </label>
//             <input type="text" name="city" id="city" className="input-box" />
//           </div>
//           <div>
//             <label htmlFor="phone" className="text-gray-600">
//               Phone number
//             </label>
//             <input
//               type="text"
//               name="phoneNumber"
//               id="phoneNumber"
//               className="input-box"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="text-gray-600">
//               Email address
//             </label>
//             <input type="email" name="email" id="email" className="input-box" />
//           </div>
//         </div>
//       </div>
//       <div className="col-span-4 border border-gray-200 p-4 rounded">
//         <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
//           order summary
//         </h4>
//         <div className="space-y-2">
//           {categories?.map((cart: any) => (
//             <div key={cart.id} className="flex justify-between">
//               <div>
//                 <h5 className="text-gray-800 font-medium">{cart.productId.name}</h5>
//                 <p className="text-sm text-gray-600">
//                   Size: {cart.productId.size}
//                 </p>
//               </div>
//               <p className="text-gray-600">x{cart.quantity}</p>
//               <p className="text-gray-800 font-medium">
//                 ${cart.quantity * cart.productId.discountPrice}
//               </p>
//             </div>
//           ))}
//         </div>
//         {/* Subtotal, shipping, total */}
//         <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
//           <p>subtotal</p>
//           <p>${totalPrice.toFixed(2)}</p>
//         </div>
//         <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
//           <p>shipping</p>
//           <p>Free</p>
//         </div>
//         <div className="flex justify-between text-gray-800 font-medium py-3 uppercase">
//           <p className="font-semibold">Total</p>
//           <p>${totalPrice.toFixed(2)}</p>
//         </div>
//         {/* Terms & conditions */}
//         <div className="flex items-center mb-4 mt-2">
//           <input
//             type="checkbox"
//             name="aggrement"
//             id="aggrement"
//             className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
//           />
//           <label
//             htmlFor="aggrement"
//             className="text-gray-600 ml-3 cursor-pointer text-sm"
//           >
//             I agree to the{" "}
//             <a href="#" className="text-primary">
//               terms & conditions
//             </a>
//           </label>
//         </div>
//         {/* Place order button */}
//         <button
//           type="submit"
//           className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
//         >
//           Place order
//         </button>
//       </div>
//     </form>
//    </>
//   );
// };

// export default Checkout;

import { auth } from "@/auth";
import { getAllCartEntries, placeOrder } from "@/db/queries";
import { dbConnect } from "@/server";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import Breack from "../../componenets/common/Breack";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CheckoutModel } from "@/model";

// Function to generate and download the invoice
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
  autoTable(doc,{ head: [tableColumn], body: tableRows });
  autoTable(doc, { html: '#my-table' });
  doc.save("invoice.pdf");
};

const Checkout = async () => {
  const session: Session | null = await auth();
  if (!session) redirect("/login");

  await dbConnect();
  const categories = await getAllCartEntries(session.user?.id as string);

  const totalPrice = categories.reduce((total: number, order: any) => {
    return total + order.productId.discountPrice * order.quantity;
  }, 0);

  return (
    <>
      <Breack>Checkout</Breack>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formValues = Object.fromEntries(formData.entries());

          // Save user information to Checkout model
          await new CheckoutModel({ userId: session.user?.id, ...formValues });

          // Save order to Order model
          await placeOrder( session?.user?.id as string , totalPrice );

          // Generate and download the invoice
          generateInvoice(categories, totalPrice);

          // Show success message
          toast.success("Order successfully placed!");

          // Redirect to a success page or clear the form (optional)
          // redirect("/success");
        }}
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
                Country/Region
              </label>
              <input
                type="text"
                name="region"
                id="region"
                className="input-box"
              />
            </div>
            <div>
              <label htmlFor="address" className="text-gray-600">
                Street address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="input-box"
              />
            </div>
            <div>
              <label htmlFor="city" className="text-gray-600">
                City
              </label>
              <input type="text" name="city" id="city" className="input-box" />
            </div>
            <div>
              <label htmlFor="phone" className="text-gray-600">
                Phone number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="input-box"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-600">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-box"
              />
            </div>
          </div>
        </div>
        <div className="col-span-4 border border-gray-200 p-4 rounded">
          <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            order summary
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
                  ${cart.quantity * cart.productId.discountPrice}
                </p>
              </div>
            ))}
          </div>
          {/* Subtotal, shipping, total */}
          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
            <p>subtotal</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
            <p>shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between text-gray-800 font-medium py-3 uppercase">
            <p className="font-semibold">Total</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          {/* Terms & conditions */}
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
          {/* Place order button */}
          <button
            type="submit"
            className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
          >
            Place order
          </button>
        </div>
      </form>
    </>
  );
};

export default Checkout;
