'use client'

import { signIn } from 'next-auth/react'

export default function AuthCard(){
    return (
        <div className="px-5 py-5">
            <div className="overflow-hidden px-3 py-3 max-w-md mx-auto rounded-md border shadow-sm bg-white">
                <button onClick={()=> signIn('google')} className="block w-full mx-auto px-4 py-2 font-semibold rounded-full border-2 border-blue-300 focus:outline focus:outline-offset-2 focus:outline-blue-500 bg-blue-400 text-white">
                    <span>Continue with Google</span>
                </button>
            </div>
        </div>
    )
}