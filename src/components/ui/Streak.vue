<script setup>
import { getStreak } from '@/services/dailyChallengeService';
import { onMounted, ref } from 'vue';

const streak = ref(null);

onMounted(async () => {
  streak.value = await getStreak().then((res) => res.data );
});
</script>

<template>
    <div class="streak">
      <Icon class="flame" icon="fa-solid fa-fire" />
      <span>Dzień</span>
      <span>{{ streak }}</span>
    </div>
</template>

<style scoped>
.streak {
  @apply
  flex
  flex-col
  gap-2
  h-fit
  w-fit
  p-3 
  border-b-[6px]
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
