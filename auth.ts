import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions as NextAuthConfig } from 'next-auth'
import { getServerSession } from 'next-auth'

import Google from 'next-auth/providers/google'

import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module 'next-auth/jwt' {
    interface JWT {
        /** The user's role. */
        userRole?: 'admin'
    }
}

export const config = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        async jwt({ token }) {
            token.userRole = 'admin'
            return token
        },
    },
} satisfies NextAuthConfig

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, config)
}

declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            NEXTAUTH_SECRET: string

            AUTH_GOOGLE_ID: string
            AUTH_GOOGLE_SECRET: string
        }
    }
}