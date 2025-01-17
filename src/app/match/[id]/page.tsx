import Game from "@/components/game.componet";

export default async function MatchPage() {
  const cols = 5; // pegar do contexto do jogo
  const rows = 5; // pegar do contexto do jogo
  const qtyCardsPerTeam = 8; // pegar do contexto do jogo
  const qtyTraps = 2; // pegar do contexto do jogo
  const language = "pt-BR"; // pegar do contexto do jogo

  return (
    <Game
      cols={cols}
      rows={rows}
      qtyCells={cols * rows}
      qtyCardsPerTeam={qtyCardsPerTeam}
      qtyTraps={qtyTraps}
      language={language}
    />
  );
}
