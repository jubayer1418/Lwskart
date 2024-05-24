"use client"

import { signIn } from "next-auth/react";




const SscialLogins = () => {
  const handleAuth = () => {
    signIn("google", { callbackUrl: "https://lwskart-mu.vercel.app/en" });
  };
  const handleAuthFacebook = () => {
    signIn("facebook", { callbackUrl: "https://lwskart-mu.vercel.app/en" });
  };
  return (
    <div className="mt-4 flex gap-4">
      <button
        onClick={handleAuthFacebook}
        className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
      >
        facebook
      </button>
      <button
        onClick={handleAuth}
        className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
      >
        google
      </button>
    </div>
  );
};

export default SscialLogins;
