'use client'

import AuthCard from '@/components/auth-card';
import Loading from '@/components/loading';
import Loader from '@/components/loader';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatDate } from '@/utils/date';


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
    }, [status, session]);

    if (!session) {
        return status == 'loading' ? <div className="my-5 py-5"><Loader /></div> : <AuthCard />
    }

    return (
        <div>
            <Link href={'/notes/create'}>Create New</Link>

            <div className="mb-5 pb-5">

                {notes.length ? notes.map((note: any) => (
                    <div key={note._id}>
                        <Link href={`/notes/${note._id}`} className="flex items-center justify-between border-b px-3 py-2 select-none bg-white hover:bg-gray-50">
                            <span>
                                <span className="block leading-none">{note.title}</span>
                                <small className="text-xs">{formatDate(note.updatedAt)}</small>
                            </span>
                        </Link>
                    </div>
                )) : (isLoading ? <div>Loading..</div> : <div>Create a note</div>)}

            </div>
        </div>
    )
}