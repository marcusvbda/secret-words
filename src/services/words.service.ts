"use server";
import { capitalize } from "@/helpers/string.helper";
import { runCompletion } from "./gpt.service";

interface IgetWords {
  qty?: number;
  language?: string;
  avoid?: string[];
}

export const getWords = async (
  params: IgetWords | null = null
): Promise<string[]> => {
  const qty = params?.qty ?? 10;
  const language = params?.language ?? "en";
  const avoid = (params?.avoid ?? []).join(", ");

  // // pra evitar gastar tokens da openai
  return [
    "Cachorro",
    "Caminhar",
    "Bonito",
    "Gato",
    "Nike",
    "Revolução",
    "Programação",
    "Pais",
    "Cidade",
    "Pessoa",
    "Futebol",
    "Cachorro",
    "Caminhar",
    "Bonito",
    "Gato",
    "Nike",
    "Revolução",
    "Programação",
    "Bairro",
    "Cidade",
    "Pessoa",
    "Futebol",
    "Cachorro",
    "Caminhar",
    "Feio",
  ];

  try {
    const responseText = await runCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an assistant that generates word lists based on user input and you should respond only with the words only, separated by | and nothing else. The words should be of any type.
            Dot not use the words "${avoid}".`,
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
