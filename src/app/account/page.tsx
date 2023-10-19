'use client';

import AuthCard from '@/components/auth-card';
import Loading from '@/components/loading';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';


export default function Account() {
    const { data: session, status } = useSession();

    if (!session) {
        return status == 'loading' ? <Loading /> : <AuthCard />
    }

    return (
        <div>
            <img src={session.user?.image || 'https://dummyimage.com/96'} width={96} height={96}></img>
            {session.user?.name}
            Secret account page
            <br />
            <button onClick={() => signOut()}>Log out</button>

            <hr />
            <Link href={'/notes'}>Notes</Link>

        </div>
    );

}