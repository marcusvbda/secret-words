"use server";
import { capitalize } from "@/helpers/string.helper";
import { runCompletion } from "./gpt.service";

interface IgetDictionary {
  qty?: number;
  language?: string;
  avoid?: string[];
}

export const getDictionary = async (
  params: IgetDictionary | null = null
): Promise<string[]> => {
  const qty = params?.qty ?? 10;
  const language = params?.language ?? "en";
  const avoid = (params?.avoid ?? []).join(", ");

  // pra evitar gastar tokens da openai
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
    "Pais",
    "Cidade",
    "Pessoa",
    "Futebol",
    "Cachorro",
    "Caminhar",
  ];

  try {
    const responseText = await runCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that generates word lists based on user input and you should respond only with the words only, separated by | and nothing else.",
        },
        {
          role: "user",
          content: `Generate ${qty} common unique words in ${language}".
            The words should be a mix of nouns, verbs, adjectives, animals, brands, hystory, professions, coutries and cities.
            Dot not use the words "${avoid}".`,
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
