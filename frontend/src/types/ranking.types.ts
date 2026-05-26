/** Entrada do ranking por agencia */
export interface RankingEntry {
  position: number;
  userName: string;
  points: number;
  lastPlayedAt: string | null;
}
