import { GameState } from '../../types';

export const getters = {
  getHorses: (state: GameState) => state.horses,
  getProgram: (state: GameState) => state.program,
  getRaceStatus: (state: GameState) => state.activeRaceStatus,
  getRacePositions: (state: GameState) => state.racePositions,
  getCurrentRaceIndex: (state: GameState) => state.racePositions,
  currentRace: (state: GameState) => {
    if (state.currentRaceIndex === -1) return null;
    return state.program[state.currentRaceIndex];
  },
  isRaceActive: (state: GameState) => state.currentRaceIndex !== -1,
};
