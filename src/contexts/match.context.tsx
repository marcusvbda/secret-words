"use client";

import { getMaps, IgetMapsResponse } from "@/services/maps.service";
import { getWords } from "@/services/words.service";
import { ReactNode, createContext, useState } from "react";

export const MatchContext = createContext<any>({});

export const MatchContextProvider = ({ children }: any): ReactNode => {
  const [words, setWords] = useState<string[]>([]);
  const [maps, setMaps] = useState<IgetMapsResponse | null>();
  const [gameLoading, setGameLoading] = useState(true);

  const fetchWords = async (qty: number, language: string) => {
    const responseWords = await getWords({
      qty,
      language,
    });
    setWords(responseWords);
  };

  const fetchMaps = async (
    qtyCardsPerTeam: number,
    qtyTraps: number,
    qtyCells: number
  ) => {
    const responseMaps: IgetMapsResponse = await getMaps({
      qtyCardsPerTeam,
      totalOfCards: qtyCells,
      qtyTraps,
    });

    setMaps(responseMaps);
  };

  return (
    <MatchContext.Provider
      value={{
        words,
        setWords,
        maps,
        setMaps,
        gameLoading,
        setGameLoading,
        fetchWords,
        fetchMaps,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};
