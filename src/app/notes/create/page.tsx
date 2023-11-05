'use client'


import AuthCard from '@/components/auth-card'
import Loading from '@/components/loading'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import NoteForm from '@/components/note-form'

export default function NotesCreate() {
  const { data: session, status } = useSession();

  if (!session) {
    return status == 'loading' ? <Loading /> : <AuthCard />
  }

  return (
    <div className="px-3 py-3 h-full">
      <NoteForm title={''} content={''} isPublic={false} />
    </div>
  )
}