import { GameState, RaceStatus } from '../../types';

export const state: GameState = {
  horses: [],
  program: [],
  currentRaceIndex: -1,
  racePositions: {},
  activeRaceStatus: RaceStatus.IDLE,
};
