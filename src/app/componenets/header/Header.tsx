import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";
import { dbConnect } from "@/server";
import { getAllCartEntries, getAllWishlistEntries } from "@/db/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearcProduct from "./SearcProduct";
import logo from "@/assets/images/logo.svg";
import { auth } from "@/auth";
import { Session } from "next-auth";

export default async function Header() {
  const session: Session | null | undefined = await auth();

  const carts = await getAllCartEntries(session?.user?.id as string);
  await dbConnect();
  const wishlist = await getAllWishlistEntries(session?.user?.id as string);

  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="Logo" className="w-32" />
        </Link>

        <div className="w-full max-w-xl relative flex">
          <span className="absolute left-4 top-3 text-lg text-gray-400">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <SearcProduct />
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/wishlist"
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="text-xs leading-3">Wishlist</div>
            <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
              {wishlist.length}
            </div>
          </Link>
          <Link
            href="/checkout"
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
            <div className="text-xs leading-3">Cart</div>
            <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
              {carts.length}
            </div>
          </Link>
          <Link
            href="/account"
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <i className="fa-regular fa-user"></i>
            </div>
            <div className="text-xs leading-3">Account</div>
          </Link>
        </div>
      </div>
    </header>
  );
}
