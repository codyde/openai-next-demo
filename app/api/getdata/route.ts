import { NextResponse } from 'next/server';

let answer: string = '';

export async function POST(req: Request) {

    let counter = 0;

    const body = await req.json()
    console.log('body: ', body)

    console.log(body.query)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+process.env.OPENAI_API_KEY
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": body.query}],
            max_tokens: 4000,
            temperature: 0.5,
        })
    });
    
    const json = await response.json();
    answer = json.choices[0].message.content.replace(/\n\n/, '')
    console.log("return successful")

    return NextResponse.json({ data: `${answer}` })
}