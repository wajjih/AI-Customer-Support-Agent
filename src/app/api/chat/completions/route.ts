import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/utils/logger";
import OpenAI from "openai";
const logger = new Logger("API:Chat");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});



export default async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Not Found" });
  }

  

  try {
    const body = await req.json();
    const {
      model,
      messages,
      max_tokens,
      temperature,
      stream,
      call,
      ...restParams
    } = body;

    const lastMessage = messages?.[messages.length - 1];
    const prompt = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `
        Create a prompt which can act as a prompt templete where I put the original prompt and it can modify it according to my intentions so that the final modified prompt is more detailed.You can expand certain terms or keywords.
        ----------
        PROMPT: ${lastMessage.content}.
        MODIFIED PROMPT: `,
      max_tokens: 500,
      temperature: 0.7,
    });

    const modifiedMessage = [
      ...messages.slice(0, messages.length - 1),
      { ...lastMessage, content: prompt.choices[0].text },
    ];

    if (stream) {
      const completionStream = await openai.chat.completions.create({
        model: model || "gpt-3.5-turbo",
        ...restParams,
        messages: modifiedMessage,
        max_tokens: max_tokens || 150,
        temperature: temperature || 0.7,
        stream: true,
      } as OpenAI.Chat.ChatCompletionCreateParamsStreaming);
      

      for await (const data of completionStream) {
        return NextResponse.json(data);
      }
    } else {
      const completion = await openai.chat.completions.create({
        model: model || "gpt-3.5-turbo",
        ...restParams,
        messages: modifiedMessage,
        max_tokens: max_tokens || 150,
        temperature: temperature || 0.7,
        stream: false,
      });
      return NextResponse.json(completion);
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
};