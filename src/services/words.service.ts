"use server";
import { capitalize } from "@/helpers/string.helper";
import { runCompletion } from "./gpt.service";

interface IgetWords {
  qty?: number;
  language?: string;
}

export const getWords = async (
  params: IgetWords | null = null
): Promise<string[]> => {
  const qty = params?.qty ?? 25;
  const language = params?.language ?? "pt-BR";

  try {
    const responseText = await runCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an assistant that generates word lists based on user input and you should respond only with the words only, separated by | and nothing else. The words should be of any type.`,
        },
        {
          role: "user",
          content: `Generate ${qty} unique random words in ${language}".`,
        },
      ],
    });

    const words = responseText
      .split("|")
      .map((word) => capitalize(word.trim()))
      .filter(Boolean);

    return words;
  } catch (error) {
    console.error("Error fetching dictionary:", error);
    return [];
  }
};
