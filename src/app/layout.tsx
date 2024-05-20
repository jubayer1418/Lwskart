import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./componenets/header/Header";
import Navbar from "./componenets/header/Navbar";
import Footer from "./componenets/footer/Footer";
import FooterBottom from "./componenets/footer/FooterBottom";
import { dbConnect } from "@/server";
import { getAllCategories } from "@/db/queries";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LWSkart",
  description:
    "best online shopping store with 17+ million products at resounding discounts in dhaka, ctg &amp; All across Bangladesh with cash on delivery (COD)",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        <Navbar></Navbar>
        {children}
        <Toaster richColors  />
        <Footer></Footer>
        <FooterBottom></FooterBottom>
      </body>
    </html>
  );
}
