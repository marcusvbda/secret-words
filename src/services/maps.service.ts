"use server";

interface IgetMaps {
  qtyCardsPerTeam?: number;
  qtyTraps?: number;
  totalOfCards: number;
}

export interface IgetMapsResponse {
  team_a: number[];
  team_b: number[];
  traps: number[];
}
export const getMaps = async (params: IgetMaps): Promise<IgetMapsResponse> => {
  const qtyCardsPerTeam = params?.qtyCardsPerTeam ?? 8;
  const qtyTraps = params?.qtyTraps ?? 1;
  const totalOfCards = params.totalOfCards;

  const generateUniqueRandomNumbers = (
    count: number,
    exclude: number[] = []
  ): number[] => {
    let numbers: number[] = [];
    while (numbers.length < count) {
      const number = Math.floor(Math.random() * totalOfCards);
      if (!exclude.includes(number) && !numbers.includes(number)) {
        numbers.push(number);
      }
    }
    return Array.from(numbers);
  };

  const team_a = generateUniqueRandomNumbers(qtyCardsPerTeam);
  const team_b = generateUniqueRandomNumbers(qtyCardsPerTeam, team_a);
  const traps = generateUniqueRandomNumbers(qtyTraps, [...team_a, ...team_b]);

  return {
    team_a,
    team_b,
    traps,
  } as IgetMapsResponse;
};
