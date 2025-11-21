<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import { RaceStatus } from '../types';
import { getHorse, getHorseStyle } from "@/helpers/horseHelper";
import { FINISH_LINE_PERCENTAGE, LANE_HEIGHT } from "@/constants";

const statusTextMap: Record<RaceStatus, string> = {
  [RaceStatus.IDLE]: 'Ready',
  [RaceStatus.RUNNING]: 'Running...',
  [RaceStatus.PAUSED]: 'Paused',
  [RaceStatus.FINISHED]: 'Finished',
};

const store = useStore();

const currentRace = computed(() => store.getters.currentRace);
const racePositions = computed(() => store.getters.getRacePositions);
const activeRaceStatus = computed(() => store.getters.getRaceStatus);
const horses = computed(() => store.getters.getHorses);

const statusText = computed(() => statusTextMap[activeRaceStatus.value] || 'Unknown');

const raceInfoText = computed(() => {
  if (!currentRace.value) return '';
  return `${currentRace.value.roundNumber}. Lap ${currentRace.value.distance}m`;
});

const horseStyles = computed(() => {
  if (!currentRace.value) return {};
  return currentRace.value.horseIds.reduce((acc: Record<number, any>, horseId: number) => {
    acc[horseId] = getHorseStyle(racePositions.value, horseId, currentRace.value!.distance);
    return acc;
  }, {});
});
</script>

<template>
  <div class="flex-1 bg-zinc-300 relative flex flex-col justify-center overflow-hidden select-none">
    <div v-if="!currentRace" class="flex-1 flex items-center justify-center flex-col text-gray-500">
      <div class="text-6xl mb-4">🐎</div>
      <p class="text-xl font-bold">Ready to Race?</p>
      <p>Click "Generate Program" to begin.</p>
    </div>
    <template v-else>
      <div class="flex-1 flex flex-col py-4 relative px-8">
        <div
          class="absolute top-0 bottom-16 border-r-4 border-red-600 z-0"
          :style="{ left: `${FINISH_LINE_PERCENTAGE}%` }"
        >
          <div class="absolute -right-14 top-2 font-bold text-red-600 uppercase tracking-wider text-sm bg-white/80 px-1">
            Finish
          </div>
        </div>
        <div
          v-for="(horseId, index) in currentRace.horseIds"
          :key="horseId"
          class="flex items-center relative border-b border-dashed border-gray-500/50 w-full"
          :style="{ height: `${LANE_HEIGHT}px` }"
        >
          <div class="absolute -left-6 w-6 h-full flex items-center justify-center bg-green-800 text-white text-xs font-bold rounded-l border-b border-green-900">
            {{ index + 1 }}
          </div>
          <div
            class="absolute transition-transform duration-75 ease-linear z-10"
            :style="horseStyles[horseId]"
          >
            <div class="relative -top-3">
              <svg width="48" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="-scale-x-100">
                <path
                  d="M18 36L12 48H6L10 34C10 34 6 32 6 28C6 24 10 16 18 12C18 12 20 6 26 4C32 2 34 6 36 8C36 8 50 8 54 14C58 20 56 28 50 32C50 32 52 40 52 44L46 56H40L42 42L30 40L26 54H20L24 38L18 36Z"
                  :fill="getHorse(horses, horseId)?.color || '#000'"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
              <div class="text-[10px] bg-black/50 text-white px-1 rounded absolute -bottom-2 left-1 whitespace-nowrap">
                {{ getHorse(horses, horseId)?.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-16 bg-gray-200 border-t border-gray-300 flex items-center justify-between px-8">
        <div class="text-xl font-bold text-red-600 uppercase">
          {{ statusText }}
        </div>
        <div class="text-xl font-bold text-red-600">
          <span v-if="activeRaceStatus === RaceStatus.FINISHED">FINISH</span>
        </div>
        <div class="text-2xl font-bold text-red-600">
          {{ raceInfoText }}
        </div>
      </div>
    </template>
  </div>
</template>
