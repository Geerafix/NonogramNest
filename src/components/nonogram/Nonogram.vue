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
    <main class="transition-all font-thin font-sans ">
        <div class="grid grid-cols-[min-content_1fr] gap-0.5  mx-auto w-fit">
            <div class="w-full h-full border-t-4 border-l-4 border-gray-700 bg-gray-600 rounded-sm rounded-ss-lg"></div>
            <NonogramYClues :clues="cluesY" />
            <NonogramXClues :clues="cluesX" />
            <NonogramBoard :size="size" :paint="paint" />
        </div>
    </main>
</template>