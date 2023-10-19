'use client'

import { signIn } from 'next-auth/react'

export default function AuthCard(){
    return (
        <div className="px-5 py-5">
            <div className="overflow-hidden px-3 py-3 max-w-md mx-auto rounded-md border shadow-sm bg-white">
                <button onClick={()=> signIn('google')} className="block mx-auto px-4 py-2 border rounded-md">
                    Continue with Google
                </button>
            </div>
        </div>
    )
}