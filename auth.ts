import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./lib/data/user";
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool } from "@neondatabase/serverless"

const neon = new Pool({
    connectionString: process.env.POSTGRES_URL,
})
const adapter = new PrismaNeon(neon)
const prisma = new PrismaClient({ adapter })

export const {
    handlers,
    auth,
    signIn,
    signOut,
    unstable_update: update,
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
    adapter: PrismaAdapter(prisma),
    ...authConfig,
    session: { strategy: "jwt" },
    trustHost: true
})