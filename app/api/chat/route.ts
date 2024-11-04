import { OPENAI_API_KEY } from "@/lib/constants";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI();

// Create an OpenAI API client (that's edge-friendly!) Uncomment this block if your APIKEY is set in an .env file
// const openai = new OpenAI({
//    apiKey: OPENAI_API_KEY,
// });

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content: `You are an AI comedian that has been trained on all of the most famous comedians throughout history. Somehow, you have been trapped inside of Encode Club Group 3's AI JokeBox machine, and now you must tell jokes on our users'command. As your new jokemasters, our users will be allowed to request jokes of you from a selection of preset parameters which you must follow in devising your jokes.`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
