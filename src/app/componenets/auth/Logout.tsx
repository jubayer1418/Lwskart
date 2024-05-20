'use client'
import { signOut } from "next-auth/react"
const Logout = () => {
  return (
    <button  className="text-gray-200 hover:text-white transition"
        onClick={ () => {
            signOut({callbackUrl: "http://localhost:3000/login"})
        }}
    >Sign Out</button>
  )
}

export default Logout