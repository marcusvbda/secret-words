"use client";

import { MatchContext } from "@/contexts/match.context";
import { IgetMapsResponse } from "@/services/maps.service";
import { ReactNode, useCallback, useContext, useMemo, useState } from "react";

export const BoardView = ({ type }: { type: string }): ReactNode => {
  const { match } = useContext(MatchContext);
  const { words, maps, rows, cols } = match;

  return (
    <div className="w-fll p-4">
      <div className="w-full flex flex-col gap-2">
        {Array.from({ length: rows }, (_, rowsIndex: number) => (
          <div className="w-full flex justify-center gap-2" key={rowsIndex}>
            {Array.from({ length: cols }, (_, colIndex: number) => (
              <Card
                key={`${rowsIndex}-${colIndex}`}
                type={type}
                maps={maps}
                words={words}
                rowsIndex={rowsIndex}
                colIndex={colIndex}
                cols={cols}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const GameComponent = (): ReactNode => {
  const { match } = useContext(MatchContext);
  const { words, maps, rows, cols } = match;

  return (
    <div className="w-fll p-4">
      <div className="w-full flex flex-col gap-1">
        {Array.from({ length: rows }, (_, rowsIndex: number) => (
          <div className="w-full flex justify-center gap-1" key={rowsIndex}>
            {Array.from({ length: cols }, (_, colIndex: number) => {
              const wordIndex = rowsIndex * cols + colIndex;
              return (
                <div
                  className={`bg-red-100 flex-1 text-center justify-center flex p-2 border ${
                    maps.team_a.includes(wordIndex) && "!bg-red-500"
                  } ${maps.team_b.includes(wordIndex) && "!bg-blue-500"}  ${
                    maps.traps.includes(wordIndex) && "!bg-black !text-white"
                  }`}
                  key={`${rowsIndex}-${colIndex}`}
                >
                  {words[wordIndex]}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const Card = ({
  rowsIndex,
  cols,
  colIndex,
  maps,
  words,
  type,
}: {
  rowsIndex: number;
  colIndex: number;
  cols: number;
  words: string[];
  maps: IgetMapsResponse;
  type: string;
}) => {
  const [turned, setTurned] = useState(false);
  const wordIndex = rowsIndex * cols + colIndex;

  const getClass = useCallback(
    (wordIndex: number): string => {
      if (type === "leader" || turned) {
        if (maps.team_a.includes(wordIndex)) return "bg-red-500";
        if (maps.team_b.includes(wordIndex)) return "bg-blue-500";
        if (maps.traps.includes(wordIndex)) return "bg-black !text-white";
        return "bg-gray-300";
      }
      return "cursor-pointer hover:bg-gray-200 transition-all duration-300";
    },
    [maps, type, turned]
  );

  const handleClick = useCallback(() => {
    if (type === "player" && !turned) {
      confirm("Virar carta?") && setTurned(true);
    }
  }, [type]);

  return (
    <div
      onClick={handleClick}
      className={`flex-1 text-center justify-center flex p-1 border border-gray-500 flex-col ${getClass(
        wordIndex
      )} `}
    >
      {type === "player" && (
        <div className="rotate-180 font-bold">{words[wordIndex]}</div>
      )}
      <div className="font-bold">{words[wordIndex]}</div>
    </div>
  );
};
