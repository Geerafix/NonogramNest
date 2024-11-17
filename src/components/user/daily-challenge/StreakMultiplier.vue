<script setup>
import {getStreak} from '@/services/dailyChallengeService.js';
import {computed, onMounted, ref} from 'vue';
import {set} from "@vueuse/core";

const streak = ref(null);

onMounted(async () => await getStreak().then((res) => set(streak, res.data)));

const multiplier = computed(() => (1 + (streak.value / 100)));
</script>

<template>
  <Transition name="fetch-fade" mode="out-in">
    <div class="flex gap-2">
      <div class="tile" v-if="!Number.isNaN(parseInt(streak))" key="0">
        <Icon class="icon" icon="fa-solid fa-fire"/>
        <span> Dzień: {{ streak }}</span>
      </div>
      <div class="tile" v-if="!Number.isNaN(parseInt(multiplier))">
        <Icon class="icon" icon="fa-solid fa-coins" key="1"/>
        <span>
          Mnożnik: <Icon class="icon w-2 h-min mb-1" icon="fa-solid fa-x"/>{{ multiplier }}
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.tile {
  @apply
  flex
  gap-2
  h-fit
  w-fit
  p-3
  border-b-4
  bg-cyan-900
  border-b-gray-800/50
  text-xl
    content-center
  rounded-xl;
}

.icon {
  @apply
  text-3xl
  mr-1
  drop-shadow-md;
}

span {
  @apply
  text-center;
}
</style>
