"use client";

import { MatchContext, MatchContextProvider } from "@/contexts/match.context";
import { ReactNode, useContext, useEffect } from "react";

interface Igame {
  cols: number;
  rows: number;
  qtyCells: number;
  qtyCardsPerTeam: number;
  qtyTraps: number;
  language: string;
}

export default function Game(props: Igame) {
  return (
    <MatchContextProvider>
      <Fragments {...props} />
    </MatchContextProvider>
  );
}

const Fragments = ({
  qtyCells,
  rows,
  qtyCardsPerTeam,
  qtyTraps,
  cols,
  language,
}: Igame): ReactNode => {
  const { words, fetchWords, maps, fetchMaps, gameLoading, setGameLoading } =
    useContext(MatchContext);

  useEffect(() => {
    Promise.all([
      fetchWords(qtyCells, language),
      fetchMaps(qtyCardsPerTeam, qtyTraps, qtyCells),
    ]).then(() => {
      setGameLoading(false);
    });
  }, []);

  return (
    <div className="w-fll p-4">
      <div className="w-full flex flex-col gap-2">
        {gameLoading || !maps ? (
          <div className="w-full flex items-center justify-center py-20">
            <div className="spinner my-10" />
          </div>
        ) : (
          <>
            {Array.from({ length: rows }, (_, rowsIndex: number) => (
              <div className="w-full flex justify-center gap-2" key={rowsIndex}>
                {Array.from({ length: cols }, (_, colIndex: number) => {
                  const wordIndex = rowsIndex * cols + colIndex;
                  return (
                    <div
                      className={`bg-red-100 flex-1 text-center justify-center flex p-2 border ${
                        maps.team_a.includes(wordIndex) && "!bg-red-500"
                      } ${maps.team_b.includes(wordIndex) && "!bg-blue-500"}  ${
                        maps.traps.includes(wordIndex) &&
                        "!bg-black !text-white"
                      }`}
                      key={`${rowsIndex}-${colIndex}`}
                    >
                      {words[wordIndex]}
                    </div>
                  );
                })}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
