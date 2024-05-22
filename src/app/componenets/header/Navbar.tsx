// Navbar.js

import Link from "next/link";
import Image from "next/image";

import { getAllCategoriesSum } from "@/db/queries";
import { dbConnect } from "@/server";
import { auth } from "@/auth";
import Logout from "../auth/Logout";
import sofa from "@/assets/images/icons/sofa.svg";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";
interface HeaderProps {
  session: Session | null;

  categories: any[];
}
export default function Navbar({ session,categories }:HeaderProps) {
  const t = useTranslations('header');
  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group">
          <span className="text-white">
            <i className="fa-solid fa-bars"></i>
          </span>
          <span className="capitalize ml-2 text-white">{t("AllCategories")}</span>

          {/* dropdown */}
          <div
            className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
            style={{ width: "300px" }}
          >
            {categories.map((category) => {
              return (
                <Link
                  key={category._id}
                  href={`/en/shop/?category=${category._id}`}
                  className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                >
                  <Image
                    src={sofa}
                    alt="sofa"
                    className="w-5 h-5 object-contain"
                  />
                  <span className="ml-6 text-gray-600 text-sm">
                    {category._id}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
          <div className="flex items-center space-x-6 capitalize">
            <Link
              href={"/"}
              className="text-gray-200 hover:text-white transition"
            >
            {t("Home")}
            </Link>

            <Link
              href="/en/shop"
              className="text-gray-200 hover:text-white transition"
            >
             {t("Shop")}
            </Link>

            <a
              href="/en/about"
              className="text-gray-200 hover:text-white transition"
            >
                 {t("About")}
            </a>
            <a
              href="/en/contact"
              className="text-gray-200 hover:text-white transition"
            >
            {t("ContactUs")}
            </a>
          </div>

          {session?.user?.email ? (
            <Logout />
          ) : (
            <Link
              href="/en/login"
              className="text-red-200 hover:text-white transition"
            >
             {t("login")}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
