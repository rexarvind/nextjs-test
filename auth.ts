import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'

import Google from 'next-auth/providers/google'

import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'
// import axios from 'axios'

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
// declare module 'next/auth' {
//     interface Session {
//     user: DefaultUser & {
//       id: string;
//     };
//   }
// }

// declare module 'next-auth/jwt' {
//     interface JWT {
//         /** The user's role. */
//         userRole?: 'admin'
//     }
// }

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
        jwt: async ({ user, token }) => {
            if(user){
                token.userRole = 'admin'
                token.uid = user.id;
            }
            // console.log('JWT => ', token);
            return token
        },
        session: async ({ session, token }) => {
          if (session?.user) {
            session.user.id = token.uid;
          }
          // axios.post('https://client90.000webhostapp.com/api/v1/auth/sync/', {
          //   uid: token.uid,
          //   name: token.name,
          //   email: token.email,
          //   image: token.picture,
          // }).then(function(res){
          //   console.log('SUCCESS => ', res.data);
          // }).catch(function(err){
          //   console.log('ERROR => ', err.response.data);
          // });
          // console.log('SESSION => ', session, token);
          return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
} satisfies NextAuthOptions

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