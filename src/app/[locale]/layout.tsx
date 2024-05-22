import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../componenets/header/Header";
import Navbar from "../componenets/header/Navbar";
import Footer from "../componenets/footer/Footer";
import FooterBottom from "../componenets/footer/FooterBottom";
import { dbConnect } from "@/server";
import {
  getAllCartEntries,
  getAllCategories,
  getAllCategoriesSum,
  getAllWishlistEntries,
} from "@/db/queries";
import { Toaster } from "sonner";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";
import { Session } from "next-auth";
const inter = Inter({ subsets: ["latin"] });
interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export const metadata: Metadata = {
  title: "LWSkart",
  description:
    "best online shopping store with 17+ million products at resounding discounts in dhaka, ctg &amp; All across Bangladesh with cash on delivery (COD)",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  await dbConnect();
  const session: Session | null | undefined = await auth();

  const carts = await getAllCartEntries(session?.user?.id as string);
  await dbConnect();
  const wishlist = await getAllWishlistEntries(session?.user?.id as string);

  const messages = await getMessages();

  const categories = await getAllCategoriesSum();
  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className={inter.className}>
          <Header carts={carts} wishlist={wishlist}></Header>
          <Navbar session={session} categories={categories}></Navbar>
          {children}
          <Toaster richColors />
          <Footer></Footer>
          <FooterBottom></FooterBottom>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
