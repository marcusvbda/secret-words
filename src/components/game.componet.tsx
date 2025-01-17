"use client";

import { getMaps, IgetMapsResponse } from "@/services/maps.service";
import { getWords } from "@/services/words.service";
import { useEffect, useState } from "react";

interface Igame {
  cols: number;
  rows: number;
  qtyCells: number;
  qtyCardsPerTeam: number;
  qtyTraps: number;
}

export default function Game({
  cols,
  rows,
  qtyCells,
  qtyCardsPerTeam,
  qtyTraps,
}: Igame) {
  const [words, setWords] = useState<string[]>([]);
  const [maps, setMaps] = useState<IgetMapsResponse | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      const responseWords = await getWords({
        qty: qtyCells,
        language: "pt-BR",
      });
      setWords(responseWords);
    };

    const fetchMaps = async () => {
      const responseMaps: IgetMapsResponse = await getMaps({
        qtyCardsPerTeam,
        totalOfCards: qtyCells,
        qtyTraps,
      });

      setMaps(responseMaps);
    };

    Promise.all([fetchWords(), fetchMaps()]).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-fll p-4">
      <div className="w-full flex flex-col gap-2">
        {loading || !maps ? (
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
}
