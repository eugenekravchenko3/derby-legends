import { Horse } from "@/src/types";

const FINISH_LINE_PERCENTAGE = 85;

export const getHorse = (horses: Horse[] | undefined, id: number | string): Horse | null => {
  if (!Array.isArray(horses)) return null;
  return horses.find(h => h.id === id) || null;
};


export const getHorseName = (horses: Horse[], id: number, fallback = 'Unknown'): string => {
  const horse = getHorse(horses, id);
  return horse ? horse.name : fallback;
};

export const getHorseStyle = (
  racePositions: Record<number, number>,
  horseId: number,
  totalDistance: number
) => {
  const distanceRun = racePositions[horseId] || 0;
  const progress = Math.min((distanceRun / totalDistance) * FINISH_LINE_PERCENTAGE, FINISH_LINE_PERCENTAGE);
  return {
    transform: `translateX(calc(${progress}vw))`
  };
};
