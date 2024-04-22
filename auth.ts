import NextAuth from "next-auth";
import { getUserByEmail, getUserById } from "./lib/data/user";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import * as bcrypt from 'bcryptjs';

globalThis.prisma ??= new PrismaClient()

export const {
    handlers,
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [Credentials({
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);

            if (validatedFields.success) {
                const { email, password } = validatedFields.data;

                const user = await getUserByEmail(email)
                if (!user || !user.password) return null

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password
                )

                if (passwordMatch) return user
            }

            return null
        }
    })],
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
    session: { strategy: "jwt" },
    trustHost: true
})