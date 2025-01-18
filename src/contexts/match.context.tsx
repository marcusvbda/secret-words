"use client";

import { IGame } from "@/services/game.service";
import { ReactNode, createContext, useState } from "react";

export const MatchContext = createContext<any>({});

export const MatchContextProvider = ({
  currentMatch,
  children,
}: any): ReactNode => {
  const [match, setMatch] = useState<IGame>(currentMatch);

  return (
    <MatchContext.Provider
      value={{
        match,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};
