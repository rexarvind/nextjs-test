'use client'

import AuthCard from '@/components/auth-card';
import Loading from '@/components/loading';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Notes() {
    const { data: session, status } = useSession();
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function loadNotes() {
        if (session && session.user && session.user.id) {
            setIsLoading(true);
            axios.get('/api/notes?userId=' + session.user.id).then(function (res) {
                if (res.status == 200 && res.data && res.data.items && res.data.items.length) {
                    setNotes(res.data.items);
                }
            }).catch(function (err) {
                console.log(err);
            }).finally(function () {
                setIsLoading(false);
            });
        }
    }

    useEffect(() => {
        if (status == 'authenticated' && session && session.user) {
            loadNotes();
        }
    }, [status]);

    if (!session) {
        return status == 'loading' ? <Loading /> : <AuthCard />
    }

    return (
        <div>
            <Link href={'/notes/create'}>Create New</Link>

            {notes.length ? notes.map((note: any) => (
                <div key={note._id}>
                    <Link href={`/notes/${note._id}`}>
                        <h2>{note.title}</h2>
                    </Link>
                </div>
            )) : (isLoading ? <div>Loading..</div> : <div>Create a note</div>)}

        </div>
    )
}