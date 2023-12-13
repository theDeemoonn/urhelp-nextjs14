import { authConfig } from "@/configs/auth";
import NextAuth from "next-auth"

const handlerAuth = NextAuth(authConfig)

export { handlerAuth as GET, handlerAuth as POST}