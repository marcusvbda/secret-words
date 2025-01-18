"use server";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase.service";
import { getWords } from "./words.service";
import { getMaps, IgetMapsResponse } from "./maps.service";

export interface IGame {
  id?: string;
  referece: string;
  cols: number;
  rows: number;
  qtyCells: number;
  qtyCardsPerTeam: number;
  qtyTraps: number;
  language: string;
  words: string[];
  maps: IgetMapsResponse;
}

export const createGame = async (): Promise<string> => {
  const cols = 5;
  const rows = 5;
  const qtyCardsPerTeam = 8;
  const qtyTraps = 1;
  const totalOfCards = cols * rows;

  const words = await getWords({
    qty: cols * rows,
    language: "pt-BR",
  });

  const maps = await getMaps({
    qtyTraps,
    totalOfCards,
    qtyCardsPerTeam,
  });

  const generateRef = (): string => {
    const timestamp = Date.now();
    return `${timestamp}`;
  };

  const referece = generateRef();

  await addDoc(collection(db, "matches"), {
    cols,
    rows,
    qtyCardsPerTeam,
    qtyTraps: 1,
    language: "pt-BR",
    words,
    maps,
    referece,
  } as IGame);

  return referece;
};

export const findMatch = async (referece: string): Promise<null | IGame> => {
  const q = query(collection(db, "matches"), where("referece", "==", referece));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;

  const docs = querySnapshot.docs;

  return {
    id: docs[0].id,
    ...docs[0].data(),
  } as IGame;
};
