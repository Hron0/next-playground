import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool } from "@neondatabase/serverless"

const neon = new Pool({
    connectionString: process.env.POSTGRES_URL,
})
const adapter = new PrismaNeon(neon)
const prisma = new PrismaClient({ adapter })


declare global {
    var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || prisma

if (process.env.NODE_ENV !== "production") globalThis.prisma = db