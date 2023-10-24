import NextAuth from 'next-auth/next'
import { config } from 'auth'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = config;

const handler = NextAuth(config)
export { handler as GET, handler as POST }