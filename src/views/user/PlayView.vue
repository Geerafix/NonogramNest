<script setup>
import Nonogram from '@/components/user/play/Nonogram.vue';
import Score from "@/components/user/play/Score.vue";
import Actions from "@/components/user/play/Actions.vue";
import Header from "@/components/ui/Header.vue"
import { useInterval } from '@vueuse/core';
import { watch, ref } from 'vue';
import { postPuzzle, postSolvedPuzzle } from '@/services/puzzleService';

const { counter, reset, pause, resume } = useInterval(1000, { controls: true });
const nonogram = ref({});
const paused = ref(false);
const started = ref(false);

function setSize(size) {
    nonogram.value.nonogram.size = size;
}

function handleNewPuzzle() {
    started.value = true;
    nonogram.value.handleNewPuzzle();
    reset();
}

function handlePause() {
    paused.value = !paused.value;
    nonogram.value.nonogram.paused = !nonogram.value.nonogram.paused;
}

function handleCheck() {
    nonogram.value.handleCheck();
}

const handleEndGame = () => {
    started.value = false;
    nonogram.value.handleEndGame();
    pause();
}

watch(paused, (newPaused) => {
    newPaused ? pause() : resume();
    nonogram.value.nonogram.paused = newPaused;
});
</script>

<template>
    <main class="flex flex-col">
        <Header></Header>
        <div class="flex flex-col justify-between h-full">
            <div :class="['info', {'hidden': started}]">
                <span>Wybierz rozmiar planszy nonogramu.</span><br>
                <span>Naciśnij przycisk z plusem, aby rozpocząć grę.</span>
            </div>
            <Nonogram ref="nonogram" :class="{'hidden': !started}" />
            <div class="actions">
                <Actions key="1" @new-game="handleNewPuzzle" @pause="handlePause" @check="handleCheck" @size="setSize" @end-game="handleEndGame"/>
                <Score key="2" v-if="started" :counter="counter" :points="nonogram.nonogram.points" />
            </div>
        </div>
    </main>
</template>

<style scoped>
.info {
    @apply 
    mx-auto 
    mt-2 
    text-2xl
    font-thin 
    font-sans 
    text-center
    h-full;
}
.actions {
    @apply 
    flex 
    flex-wrap-reverse 
    justify-end 
    w-full     
    gap-2;
}
</style>