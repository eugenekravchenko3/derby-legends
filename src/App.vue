<script setup lang="ts">
import Header from './components/Header.vue';
import HorseList from './components/HorseList.vue';
import Track from './components/Track.vue';
import ProgramResults from './components/ProgramResults.vue';
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-100 font-sans text-gray-900">
    <Header />
    <main class="flex flex-1 overflow-hidden">
      <HorseList />
      <Track />
      <ProgramResults />
    </main>
  </div>
</template>
