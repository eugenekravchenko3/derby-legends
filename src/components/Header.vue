<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import { RaceStatus } from '../types';
import {
  GENERATE_PROGRAM,
  NEXT_RACE,
  PAUSE_RACE,
  START_RACE
} from "@/store/game/action-types";

const store = useStore();

const status = computed(() => store.getters.getRaceStatus);
const isRaceActive = computed(() => store.getters.isRaceActive);
const isRunning = computed(() => status.value === RaceStatus.RUNNING);

const actionMap: Record<
  RaceStatus,
  { label: string; action: () => void }
> = {
  [RaceStatus.IDLE]: {
    label: 'Start',
    action: () => store.dispatch(START_RACE)
  },
  [RaceStatus.PAUSED]: {
    label: 'Start',
    action: () => store.dispatch(START_RACE)
  },
  [RaceStatus.RUNNING]: {
    label: 'Pause',
    action: () => store.dispatch(PAUSE_RACE)
  },
  [RaceStatus.FINISHED]: {
    label: 'Next Race',
    action: () => store.dispatch(NEXT_RACE)
  }
};

const buttonLabel = computed(() => actionMap[status.value]?.label || 'Start');

const generateProgram = () => store.dispatch(GENERATE_PROGRAM);

const toggleRace = () => actionMap[status.value]?.action();
</script>

<template>
  <header class="bg-red-400 text-black px-6 py-3 flex items-center justify-between shadow-md z-10 sticky top-0">
    <h1 class="text-2xl font-bold text-white">Horse Racing</h1>
    <div class="space-x-4">
      <button
        @click="generateProgram"
        :disabled="isRunning"
        :class="['btn', isRunning ? 'btn-disabled' : 'btn-enabled']"
      >
        Generate Program
      </button>
      <button
        @click="toggleRace"
        :disabled="!isRaceActive"
        :class="['btn', !isRaceActive ? 'btn-disabled' : 'btn-enabled']"
      >
        {{ buttonLabel }}
      </button>
    </div>
  </header>
</template>
