"use server";

import OpenAI from "openai";

interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIChoice {
  message: OpenAIMessage;
  finish_reason: string;
  index: number;
}

interface OpenAICompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenAIChoice[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export const runCompletion = async (params: any): Promise<string> => {
  const openai = new OpenAI();

  try {
    const completion: OpenAICompletion = (await openai.chat.completions.create({
      model: "gpt-4o",
      store: true,
      ...params,
    })) as OpenAICompletion;

    return completion.choices?.[0]?.message?.content ?? "";
  } catch (error) {
    console.error("Error fetching dictionary:", error);
    return "";
  }
};
