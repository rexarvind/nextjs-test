'use client'

import AuthCard from '@/components/auth-card';
import Loading from '@/components/loading';
import { useSession } from 'next-auth/react'

export default function Notes(){
    const { data: session, status} = useSession();

    if(!session) {
        return status == 'loading' ? <Loading /> : <AuthCard />
    }

    return (
        <div>
            notes
        </div>
    )
}