import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./lib/data/user";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

globalThis.prisma ??= new PrismaClient()

export const {
    handlers,
    auth,
    signIn,
    signOut
} = NextAuth({
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                // @ts-ignore
                session.user.role = token.role
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token

            token.role = existingUser.role

            return token
        }
    },
    adapter: PrismaAdapter(globalThis.prisma),
    ...authConfig,
    session: { strategy: "jwt" },
    trustHost: true
})