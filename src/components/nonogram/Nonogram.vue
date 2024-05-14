<script setup>
import NonogramXClues from './NonogramXClues.vue';
import NonogramYClues from './NonogramYClues.vue';
import NonogramBoard from './NonogramBoard.vue';
defineProps([
    'cluesX', 
    'cluesY', 
    'size', 
    'paint'
]);
</script>

<template>
    <main class="font-thin font-sans transition-all">
        <div class="grid gap-0.5 grid-cols-[min-content_1fr] mx-auto w-fit">
            <div class="w-full h-full bg-gray-600 border-t-4 border-l-4 border-gray-700 rounded-sm rounded-ss-lg"></div>
            <NonogramYClues :clues="cluesY"></NonogramYClues>
            <NonogramXClues :clues="cluesX"></NonogramXClues>
            <NonogramBoard :size="size" :paint="paint"></NonogramBoard>
        </div>
    </main>
</template>