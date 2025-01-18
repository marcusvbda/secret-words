"use client";

import { BoardView, GameComponent } from "@/components/game.component";
import { MatchContextProvider } from "@/contexts/match.context";
import { IGame } from "@/services/game.service";
import { ReactNode } from "react";

interface IProps extends IGame {
  type: string;
}

export default function Fragment(props: IProps): ReactNode {
  return (
    <MatchContextProvider currentMatch={props as IGame}>
      <BoardView type={props.type} />
    </MatchContextProvider>
  );
}
