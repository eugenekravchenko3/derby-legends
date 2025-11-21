<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import { getHorseName } from "@/helpers/horseHelper";
import { Race } from "@/types";

const store = useStore();
const bottomRef = ref<HTMLElement | null>(null);

const program = computed(() => store.getters.getProgram);
const currentRaceIndex = computed(() => store.getters.getCurrentRaceIndex);
const horses = computed(() => store.getters.getHorses || []);

const noResults = computed(() =>
  program.value.length > 0 && program.value.every(r => !r.results || r.results.length === 0)
)

const getRaceHeader = (race: Race) => `Lap ${race.roundNumber} - ${race.distance}m`;
</script>

<template>
  <aside class="w-96 bg-white border-l border-gray-300 flex flex-col h-full">
    <div class="flex h-10 border-b border-gray-300 font-bold text-white text-center text-sm uppercase tracking-wide shrink-0">
      <div class="w-1/2 bg-blue-500 flex items-center justify-center">Program</div>
      <div class="w-1/2 bg-green-400 flex items-center justify-center text-black">Results</div>
    </div>
    <div class="flex-1 overflow-y-auto flex">
      <div class="w-1/2 border-r border-gray-200">
        <div
          v-for="race in program"
          :key="race.id"
          class="mb-0 border-b border-gray-300"
          :class="{ 'bg-blue-50': currentRaceIndex === race.id - 1 }"
        >
          <div class="bg-red-300 text-center text-xs font-bold py-1 text-black">
            {{ getRaceHeader(race) }}
          </div>
          <div class="text-xs">
            <div class="flex bg-gray-100 font-semibold border-b border-gray-200">
              <div class="w-10 py-1 text-center border-r border-gray-200">Pos</div>
              <div class="flex-1 py-1 text-center">Name</div>
            </div>
            <div
              v-for="(horseId, idx) in race.horseIds"
              :key="horseId"
              class="flex border-b border-gray-100 last:border-0"
            >
              <div class="w-10 py-1 text-center border-r border-gray-200 text-gray-500">{{ idx + 1 }}</div>
              <div class="flex-1 py-1 px-2 text-gray-800 truncate">{{ getHorseName(horses, horseId) }}</div>
            </div>
          </div>
        </div>
        <div v-if="!program.length" class="p-4 text-center text-gray-400 text-sm">
          No Program
        </div>
      </div>

      <div class="w-1/2 bg-gray-50">
        <template v-for="race in program" :key="race.id">
          <div v-if="race.results && race.results.length > 0" class="mb-0 border-b border-gray-300 bg-white">
            <div class="bg-red-300 text-center text-xs font-bold py-1 text-black">
              {{ race.roundNumber }}ST Lap - {{ race.distance }}m
            </div>
            <div class="text-xs">
              <div class="flex bg-gray-100 font-semibold border-b border-gray-200">
                <div class="w-10 py-1 text-center border-r border-gray-200">Pos</div>
                <div class="flex-1 py-1 text-center">Name</div>
              </div>
              <div
                v-for="(horseId, idx) in race.results"
                :key="horseId"
                class="flex border-b border-gray-100 last:border-0"
              >
                <div class="w-10 py-1 text-center border-r border-gray-200 font-bold">{{ idx + 1 }}</div>
                <div class="flex-1 py-1 px-2 text-gray-800 truncate">{{ getHorseName(horses, horseId) }}</div>
              </div>
            </div>
          </div>
        </template>
        <div ref="bottomRef"></div>
        <div v-if="noResults" class="p-4 text-center text-gray-400 text-sm">
          No Results Yet
        </div>
      </div>
    </div>
  </aside>
</template>
