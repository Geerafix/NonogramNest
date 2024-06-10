<script setup>
import NonogramXClues from './NonogramXClues.vue';
import NonogramYClues from './NonogramYClues.vue';
import NonogramBoard from './NonogramBoard.vue';
defineProps([
    'cluesX',
    'cluesY',
    'size',
    'paused',
    'paint'
]);


</script>

<template>
    <main class="transition-all font-thin font-sans relative">
        <span v-if="paused" :style="{ opacity: paused ? 1 : 0 }" class="paused-info">Gra zatrzymana</span>
        <div class="grid grid-cols-[min-content_1fr] gap-0.5  mx-auto w-fit z-100 transition-all"
            :style="{ opacity: paused ? 0.5 : 1, filter: paused ? 'blur(4px)' : 'blur(0)' }" >
            <div class="w-full h-full border-t-4 border-l-4 border-gray-700 bg-gray-600 rounded-sm rounded-ss-lg"></div>
            <NonogramYClues :clues="cluesY" />
            <NonogramXClues :clues="cluesX" />
            <NonogramBoard :size="size" :paint="paint" />
        </div>
    </main>
</template>

<style scoped>
.paused-info {
    @apply 
    z-10 
    absolute 
    p-2 
    top-1/2 
    left-1/2 
    -translate-x-1/2 
    -translate-y-1/2 
    bg-slate-800/75 
    rounded-lg 
    text-white 
    text-nowrap 
    text-xl
    select-none;
}
</style>