import { GameState, RaceStatus } from '../../types';

export const mutations = {
  SET_HORSES(state: GameState, horses: any[]) {
    state.horses = horses;
  },
  SET_PROGRAM(state: GameState, program: any[]) {
    state.program = program;
  },
  SET_CURRENT_RACE_INDEX(state: GameState, index: number) {
    state.currentRaceIndex = index;
  },
  SET_RACE_STATUS(state: GameState, status: RaceStatus) {
    state.activeRaceStatus = status;
  },
  RESET_POSITIONS(state: GameState) {
    state.racePositions = {};
  },
  UPDATE_POSITIONS(state: GameState, positions: Record<number, number>) {
    state.racePositions = { ...state.racePositions, ...positions };
  },
  ADD_RESULT(state: GameState, { raceIndex, horseId }: { raceIndex: number; horseId: number }) {
    const race = state.program[raceIndex];
    if (race && !race.results.includes(horseId)) race.results.push(horseId);
  },
  FINISH_RACE(state: GameState, raceIndex: number) {
    const race = state.program[raceIndex];
    if (race) race.status = RaceStatus.FINISHED;
  }
};
