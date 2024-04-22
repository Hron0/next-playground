import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import {LoginSchema} from "@/schemas/index"
import {getUserByEmail} from "@/lib/data/user"
import * as bcrypt from 'bcryptjs';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client/edge"

const prisma = new PrismaClient()

export default {
  adapter: PrismaAdapter(prisma),
  providers: [Credentials({
    async authorize(credentials) {
      const validatedFields = LoginSchema.safeParse(credentials);

      if (validatedFields.success) {
        const {email, password} = validatedFields.data;

        const user = await getUserByEmail(email)
        if(!user || !user.password) return null

        const passwordMatch = await bcrypt.compare(
          password,
          user.password
        )

        if(passwordMatch) return user
      }

      return null
    }
  })],
} satisfies NextAuthConfig