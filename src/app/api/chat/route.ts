import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

export async function POST(req: Request, res: Response) {
    const data = await req.json();
    if (data && data.message) {
        const openai = new OpenAIApi(
            new Configuration({
                apiKey: process.env.OPENAI_API_KEY,
            })
        );
        openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'write obituary' }],
        }).then(function(response){
            return NextResponse.json({ 'message': 'test', 'data': response });
        }).catch(function(error){
            return NextResponse.json({ 'message': 'An error occurred', 'data': error });
        });
    } else {
        return NextResponse.json({ 'message': 'Message is required' });
    }
}
