import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

export async function GET(req: Request) {
   if(req?.url){
return NextResponse.json({ 'id': nanoid() });
   } else{
return NextResponse.json({ 'id': nanoid() });
}
}
