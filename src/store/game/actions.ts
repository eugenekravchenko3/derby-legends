import { RaceStatus, Horse, Race} from '@/types';
import { generateCreativeHorseNames } from '@/helpers/nameHelper';
import {
  MOCK_NAMES,
  HORSE_COLORS,
  RACE_DISTANCES
} from '@/constants'
import {
  GENERATE_PROGRAM,
  START_RACE,
  PAUSE_RACE,
  RUN_RACE_LOOP,
  NEXT_RACE
} from './action-types';

let animationFrameId: number | null = null;
const BASE_SPEED = 60;

export const actions = {
  [GENERATE_PROGRAM]: async ({ commit }: any) => {
    let names = [...MOCK_NAMES];
    try {
      const generated = await generateCreativeHorseNames(20);
      if (generated.length === 20) names = generated;
    } catch {
      console.warn('Using mock names');
    }

    const horses: Horse[] = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: names[i % names.length],
      condition: Math.floor(Math.random() * 100) + 1,
      color: HORSE_COLORS[i % HORSE_COLORS.length]
    }));

    const races: Race[] = RACE_DISTANCES.map((distance, index) => {
      const shuffled = [...horses].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10).map(h => h.id);

      return {
        id: index + 1,
        roundNumber: index + 1,
        distance,
        horseIds: selected,
        status: RaceStatus.IDLE,
        results: []
      };
    });

    commit('SET_HORSES', horses);
    commit('SET_PROGRAM', races);
    commit('SET_CURRENT_RACE_INDEX', 0);
    commit('SET_RACE_STATUS', RaceStatus.IDLE);
    commit('RESET_POSITIONS');
  },
  [START_RACE]: ({ commit, dispatch, state }: any) => {
    if (state.activeRaceStatus === RaceStatus.RUNNING) return;
    commit('SET_RACE_STATUS', RaceStatus.RUNNING);
    dispatch(RUN_RACE_LOOP);
  },
  [PAUSE_RACE]: ({ commit }: any) => {
    commit('SET_RACE_STATUS', RaceStatus.PAUSED);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  },
  [RUN_RACE_LOOP]: ({ commit, state }: any) => {
    let lastTime = performance.now();
    const loop = (time: number) => {
      if (state.activeRaceStatus !== RaceStatus.RUNNING) return;

      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const currentRace = state.program[state.currentRaceIndex];
      if (!currentRace) return;

      const newPositions = { ...state.racePositions };
      let allFinished = true;

      currentRace.horseIds.forEach(horseId => {
        if (currentRace.results.includes(horseId)) return;
        const horse = state.horses.find(h => h.id === horseId);
        const conditionBonus = ((horse?.condition || 50) / 100) * 10;
        const randomFlux = (Math.random() - 0.5) * 5;
        const speed = BASE_SPEED + conditionBonus + randomFlux;

        const currentPos = newPositions[horseId] || 0;
        const nextPos = currentPos + speed * dt;

        if (nextPos >= currentRace.distance) {
          newPositions[horseId] = currentRace.distance;
          commit('ADD_RESULT', { raceIndex: state.currentRaceIndex, horseId });
        } else {
          newPositions[horseId] = nextPos;
          allFinished = false;
        }
      });

      commit('UPDATE_POSITIONS', newPositions);

      if (allFinished) {
        commit('FINISH_RACE', state.currentRaceIndex);
        commit('SET_RACE_STATUS', RaceStatus.FINISHED);
        animationFrameId = null;
      } else {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    animationFrameId = requestAnimationFrame(loop);
  },
  [NEXT_RACE]: ({ commit, state }: any) => {
    if (state.currentRaceIndex < state.program.length - 1) {
      commit('SET_CURRENT_RACE_INDEX', state.currentRaceIndex + 1);
      commit('SET_RACE_STATUS', RaceStatus.IDLE);
      commit('RESET_POSITIONS');
    }
  }
};
