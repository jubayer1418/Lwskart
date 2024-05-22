import { getAllWishlistEntries } from "@/db/queries";
import { dbConnect } from "@/server";
import Image from "next/image";
import AddToCard from "../../componenets/card/AddToCard";
import { replaceMongoIdInObject, replaceMongoIdInObjectID } from "@/utils";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Session } from "next-auth";
const Wishlist = async () => {
  const session : Session | null | undefined = await auth();
  if (!session) redirect("login");
  await dbConnect();
  const allWishlists = await getAllWishlistEntries(session?.user?.id as string);

  return (
    <div className="container gap-6 pt-4 pb-16">
      {/* Wishlist */}
      <div className="mx-auto space-y-4 max-w-6xl">
        {/* Product 1 */}
        {allWishlists.map((wishlist:any) => (
          <div
            key={wishlist.id}
            className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded"
          >
            <div className="w-28">
              <Image
                width={200}
                height={200}
                src={wishlist.productId.img}
                alt="product 6"
                className="w-full"
              />
            </div>
            <div className="w-1/3">
              <h2 className="text-gray-800 text-xl font-medium uppercase">
              {wishlist.productId.name}
              </h2>
              <p className="text-gray-500 text-sm">
                Availability: <span className="text-green-600">{wishlist.productId.availability}</span>
              </p>
            </div>
            <div className="text-primary text-lg font-semibold">${wishlist.productId.price}</div>
            <AddToCard customerId={session?.user?.id} mode={"wish"} id={replaceMongoIdInObjectID(wishlist.productId)}/>
            <div className="text-gray-600 cursor-pointer hover:text-primary">
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
