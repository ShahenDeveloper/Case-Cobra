"use client"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

const ShowNavbar = () => {
    const pathName = usePathname()
    if (pathName.startsWith("/auth")) {
        return null 
    } else {
        return <Navbar /> 
    }
}

export default ShowNavbar
