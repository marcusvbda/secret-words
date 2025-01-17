import ClientSideFragments from "./clientSide";

export default async function MatchPage() {
  const cols = 5; // pegar do contexto do jogo
  const rows = 5; // pegar do contexto do jogo
  const qtyCells = cols * rows;
  const qtyCardsPerTeam = 8; // pegar do contexto do jogo
  const qtyTraps = 2; // pegar do contexto do jogo

  return (
    <ClientSideFragments
      cols={cols}
      rows={rows}
      qtyCells={qtyCells}
      qtyCardsPerTeam={qtyCardsPerTeam}
      qtyTraps={qtyTraps}
    />
  );
}
