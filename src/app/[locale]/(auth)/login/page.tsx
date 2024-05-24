import { auth } from "@/auth";

import FormLogin from "./FormLogin";
import SscialLogins from "@/app/componenets/auth/SscialLogins";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  (session);
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
        <p className="text-gray-600 mb-6 text-sm">Welcome back customer</p>
        <FormLogin session={session}/>

        {/* login with */}
        <div className="mt-6 flex justify-center relative">
          <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
            Or login with
          </div>
          <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
        </div>
        <SscialLogins  />
        {/* ./login with */}

        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/en/register" className="text-primary">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
