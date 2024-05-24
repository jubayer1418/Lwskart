"use client";

import { login } from "@/db/action";


import { useRouter, useSearchParams } from "next/navigation";


import { toast } from "sonner";

const FormLogin = ({session}:any) => {
  
  const router = useRouter();
  const searchParams =useSearchParams()
  const returnUrl = searchParams.get("returnUrl");
 

  return (
    <form
      action={async (formData) => {
        const toastId = toast.loading("Logging in...");

        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;
        if (!email || !password) {
          toast.error("All fields are required", {
            id: toastId,
          });
          return;
        }
        const res = await login(email, password);
        

        if (res.success  && returnUrl) {
          toast.success(res?.message as string, {
            id: toastId,
          });
          router.push(returnUrl);
        } else if (res.success) {
          toast.success(res?.message as string, {
            id: toastId,
          });
          router.push("/");
        }else {
          toast.error(res.message as string, {
            id: toastId,
          });
        }
      }}
    >
      <div className="space-y-2">
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
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="text-gray-600 ml-3 cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <a href="#" className="text-primary">
          Forgot password
        </a>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
