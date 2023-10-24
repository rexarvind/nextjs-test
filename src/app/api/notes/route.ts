import { NextResponse } from 'next/server'

import { mongooseConnect } from '@/lib/mongoose'
import { Note } from '@/models/note'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    const url = new URL(req.url)
    const userId = url.searchParams.get('userId');
    const _id = url.searchParams.get('id');
    let currentUserId = '';

    if (session && session.user && session.user.id) {
        currentUserId = session.user.id;
    }

    if(userId && userId.length){
        await mongooseConnect();
        const notes = await Note.find({userId: userId}, {title: 1, updatedAt: 1}).sort({updatedAt: -1});
        return NextResponse.json({items: notes});
    } else if(_id && _id.length){
        await mongooseConnect();
        const notes = await Note.findOne({_id: _id});
        if(currentUserId && currentUserId.length && notes?.userId && notes?.userId.toString().length && notes?.userId.toString() == currentUserId){
            return NextResponse.json({items: [notes], canEdit: true});
        }

        if(notes?.isPublic){
            return NextResponse.json({items: [notes], });
        } else {
            return NextResponse.json({items: []}, {status: 401});
        }
    }
    return NextResponse.json([]);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (session && session.user && session.user.id) {
        const body = await req.json();
        const { title, content, isPublic } = body;
        await mongooseConnect();
        const noteDoc = await Note.create({
            title, content, isPublic, userId: session.user.id
        });
        return NextResponse.json({ items: [noteDoc], message: 'Created note' });
    } else {
        return NextResponse.json({ message: 'Please log in to continue.' }, { status: 401 });
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    if (session && session.user && session.user.id) {
        const currentUesrID = session.user.id;
        const body = await req.json();
        const { _id, title, content, isPublic } = body;
        await mongooseConnect();
        try {
            await Note.updateOne({ _id: _id, userId: currentUesrID }, { title, content, isPublic });
            return NextResponse.json({ message: 'Updated note' }, { status: 200 });
        } catch (e){
            return NextResponse.json({ message: 'Please log in to continue.' }, { status: 401 });
        }
    } else {
        return NextResponse.json({ message: 'Please log in to continue.' }, { status: 401 });
    }
}


