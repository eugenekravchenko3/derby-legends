export interface Horse {
  id: number;
  name: string;
  condition: number;
  color: string;
}

export enum RaceStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
}

export interface Race {
  id: number;
  roundNumber: number;
  distance: number;
  horseIds: number[];
  status: RaceStatus;
  results: number[];
}

export interface GameState {
  horses: Horse[];
  program: Race[];
  currentRaceIndex: number;
  racePositions: Record<number, number>;
  activeRaceStatus: RaceStatus;
}
