'use client'
import { signOut } from "next-auth/react"
import { useTranslations } from "next-intl";
const Logout = () => {
  const t = useTranslations('header');
  return (
    <button  className="text-gray-200 hover:text-white transition"
        onClick={ () => {
            signOut({callbackUrl: "https://lwskart-mu.vercel.app/en"})
        }}
    > {t("singOut")}</button>
  )
}

export default Logout