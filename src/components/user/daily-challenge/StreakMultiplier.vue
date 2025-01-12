<script setup>
import {getStreak} from '@/services/dailyChallengeService.js';
import {computed, onMounted, ref} from 'vue';
import {set} from "@vueuse/core";

const streak = ref(null);

onMounted(async () => await getStreak().then((res) => set(streak, res.data)));

const multiplier = computed(() => (1 + (streak.value / 100)));
</script>

<template>
  <Transition mode="out-in" name="fetch-fade">
    <div class="flex gap-2">
      <div v-if="!Number.isNaN(parseInt(streak))" key="0" class="tile">
        <span> Dzień: {{ streak }}</span>
        <Icon class="icon" icon="fa-solid fa-fire"/>
      </div>
      <div v-if="!Number.isNaN(parseInt(multiplier))" key="1" class="tile">
        <span>
          Mnożnik: <Icon class="icon w-2 h-min mb-1" icon="fa-solid fa-x"/>{{ multiplier }}
        </span>
        <Icon class="icon" icon="fa-solid fa-coins"/>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.tile {
  @apply
  flex
  gap-2
  h-14
  w-fit
  [&>*]:my-auto
  px-3
  border-b-4
  bg-cyan-900
  border-b-gray-800/50
  text-xl
  rounded-xl;
}

.icon {
  @apply
  text-2xl
  drop-shadow-md;
}
</style>
