<script setup>
import {getStreak} from '@/services/dailyChallengeService.js';
import {onMounted, ref} from 'vue';
import {set} from "@vueuse/core";

const streak = ref(null);

onMounted(async () => await getStreak().then((res) => set(streak, res.data)));
</script>

<template>
  <Transition name="fetch-fade">
    <div class="streak" v-if="!Number.isNaN(parseInt(streak))">
      <Icon class="flame" icon="fa-solid fa-fire"/>
      <span> Dzień {{ streak }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.streak {
  @apply
  flex
  gap-2
  h-fit
  w-fit
  p-3
  border-b-4
  bg-gray-600
  border-b-gray-800/50
  text-xl
  rounded-xl;
}

.flame {
  @apply
  text-3xl
  text-orange-600/80
  drop-shadow-md;
}

span {
  @apply
  text-center;
}
</style>
