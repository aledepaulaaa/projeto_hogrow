export interface RoulettePrize {
  id: number;
  label: string;
  color: string;
  textColor: string;
}

export interface RouletteState {
  isSpinning: boolean;
  result: RoulettePrize | null;
  rotation: number;
  showResult: boolean;
}

export type SpinAction = () => void;
export type ResetAction = () => void;
