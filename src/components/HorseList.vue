<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import Horse from "@/components/Horse.vue";

const store = useStore();

const horses = computed(() => store.getters.getHorses);
</script>

<template>
  <aside class="w-64 bg-white flex flex-col border-r border-gray-300 h-full">
    <div class="bg-yellow-300 p-3 text-center font-bold border-b border-gray-400">
      Horse List (1-20)
    </div>
    <div class="flex-1 overflow-y-auto">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0 shadow-sm">
          <tr>
            <th class="px-4 py-3 font-bold">Name</th>
            <th class="px-2 py-3 font-bold text-center">Cond.</th>
            <th class="px-2 py-3 font-bold text-center">Color</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <Horse
            v-for="horse in horses"
            :key="horse.id"
            :horse="horse"
          />
          <tr v-if="horses.length === 0">
            <td colspan="3" class="px-4 py-8 text-center text-gray-500 italic">
              No horses generated.<br/>Click "Generate Program".
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </aside>
</template>
