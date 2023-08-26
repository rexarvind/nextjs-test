import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

export async function GET(request: Request) {
   return NextResponse.json({ 'id': nanoid() });
}
