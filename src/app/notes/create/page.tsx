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
    <div>
      <Link href={'/notes'}>Back</Link>
    <NoteForm title={''} content={''} isPublic={false} />

{/*
      <form onSubmit={handleSave}>
        <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border" />
        <textarea name="content" value={content} onChange={e => setContent(e.target.value)} placeholder="Write something..." className="border"></textarea>
        <input type="checkbox" defaultChecked={isPublic} name="isPublic" onChange={() => setIsPublic((state) => !state)} />

        {isSaving ? <div>loading</div> :
          <button type="submit" className="border">Save</button>
        }
      </form>
*/}
    </div>
  )
}