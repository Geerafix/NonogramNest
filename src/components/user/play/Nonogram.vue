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
    <main class="nonogram-container">
        <div v-if="paused" :class="['paused-info', { 'opacity-1': paused }]">Gra wstrzymana</div>
        <div :class="['components', {'paused-filter': paused }]">
            <div class="blank-area"><div class="size-info">{{ size }} x {{ size }}</div></div>
            <NonogramYClues :clues="cluesY" />
            <NonogramXClues :clues="cluesX" />
            <NonogramBoard :size="size" :paint="paint" />
        </div>
    </main>
</template>

<style scoped>
.blank-area {
    @apply 
    content-center 
    w-full 
    h-full 
    border-t-4 
    border-l-4 
    border-gray-700 
    bg-gray-600 
    rounded-sm 
    rounded-ss-lg;
}
.size-info {
    @apply 
    h-fit 
    w-fit 
    mx-auto 
    -rotate-45
    text-gray-400;
}
.paused-filter {
    @apply 
    filter 
    blur-sm 
    brightness-[0.9];
}
.paused-info {
    @apply 
    z-10 
    absolute 
    p-4
    top-1/2 
    left-1/2 
    -translate-x-1/2 
    -translate-y-1/2 
    bg-gray-600     
    rounded-xl 
    text-white 
    text-nowrap 
    text-2xl
    select-none
    border-b-4
    border-b-gray-700;
}
.nonogram-container {
    @apply 
    transition-all 
    font-thin 
    font-sans 
    relative;
}
.components {
    @apply 
    grid 
    grid-cols-[min-content_1fr] 
    gap-0.5 
    mx-auto 
    w-fit 
    z-10
    transition-all;
}
</style>