'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'

import NoteForm from "@/components/note-form";

export default function NoteByID({ params }: { params: { id: string } }) {
    const { id } = params;
    const { data: session, status } = useSession();
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [note, setNote] = useState<any>({});
    const [canView, setCanView] = useState(false);

    function loadNote() {
        setIsLoading(true);
        axios.get('/api/notes?id=' + id).then(function (res) {
            if (res.status == 200 && res.data && res.data.items && res.data.items.length) {
                setCanView(true)
                setNote(res.data.items[0]);
            }
            if (res.status == 401) {
                setCanView(false)
            }
        }).catch(function (err) {
            console.log(err)
        }).finally(function () {
            setIsLoading(false);
        });
    }

    useEffect(()=> {
        loadNote()
    }, [id]);

    useEffect(() => {
        if (status == 'authenticated' && session && session.user && session.user.id) {
            setUserId(session.user.id);
        }
    }, [status]);

    return (
        <section className="px-4 py-4 h-full">
            {isLoading ? <div>Lading</div> : (!canView ? <div>This note is private</div> : (
                <NoteForm _id={note?._id} title={note?.title} content={note?.content} isPublic={note?.isPublic} />
            ))}
        </section>
    )

}