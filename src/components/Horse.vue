<script setup lang="ts">
import type { Horse } from '@/types';

defineProps<{
  horse: Horse;
}>();
</script>

<template>
  <tr class="hover:bg-gray-50">
    <td
      class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]"
      :title="horse.name"
    >
      {{ horse.name }}
    </td>
    <td class="px-2 py-2 text-center text-gray-600">
      {{ horse.condition }}
    </td>
    <td class="px-2 py-2 text-center">
      <div
        class="w-4 h-4 rounded-full mx-auto border border-gray-200"
        :style="{ backgroundColor: horse.color }"
        :title="horse.color"
      ></div>
    </td>
  </tr>
</template>
