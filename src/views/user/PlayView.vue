<script setup>
import Nonogram from '@/components/user/game/Nonogram.vue';
import Score from "@/components/user/game/Score.vue";
import Actions from "@/components/user/game/Actions.vue";
import Header from "@/components/ui/Header.vue"
import Notification from '@/components/ui/Notification.vue';
import Summary from '@/components/user/game/Summary.vue';
import { set, useInterval } from '@vueuse/core';
import { watch, ref, reactive } from 'vue';
import { postPuzzle, postSolvedPuzzle } from '@/services/puzzleService';

const { counter, reset, pause, resume } = useInterval(1000, { controls: true });

const started = ref(false);
const paused = ref(true);
const nonogram = ref(null);

const points = ref(null);

const summary = ref(null);

const notification = ref(null);
const notificationData = reactive({message: '', status: true, time: 2500});

const setSize = (size) =>  { 
    nonogram.value.nonogram.size = size; 
    set(points, Math.pow(size, 2) * size);
};

const handleNewGame = () => {
    set(started, true);
    set(paused, false);
    nonogram.value.newGame();
    reset();
};

const handlePause = () => {
    paused.value = !paused.value;
};

const handleCheck = async () => {
    const data = nonogram.value.checkSolution();
    if (!data.isSolved) {
        set(points, (points.value - data.lostPoints >= 0) ? points.value - data.lostPoints : 0);
        notificationData.message = `Twoje rozwiązanie jest niepoprawne. Tracisz ${data.lostPoints} pkt.`;
        notificationData.status = false;
        notification.value.start();
    } else {
        await postPuzzle(nonogram.value.nonogram.cluesX, nonogram.value.nonogram.cluesY, nonogram.value.nonogram.size)
            .then((res) => { nonogram.value.nonogram.id = res.data.id });
        await postSolvedPuzzle(nonogram.value.nonogram.id, counter.value, points.value);
        summary.value.show(points.value);
        handleEndGame();    
    }
};

const handleResetGame = () => {
    counter.value = 0;
    set(points, Math.pow(nonogram.value.nonogram.size, 2) * nonogram.value.nonogram.size);
    nonogram.value.resetGame(2);
};

const handleEndGame = () => {
    set(started, false);
    set(points, null);
    nonogram.value.resetGame(1);
}

watch(paused, (newValue) => newValue ? pause() : resume() );
</script>

<template>
    <main class="view">
        <Header></Header>
        <Transition name="fade">
            <div class="game-instructions" v-if="!started">
                <p>Wybierz rozmiar planszy nonogramu.<br>Naciśnij przycisk z plusem, aby rozpocząć grę.</p>
            </div>
        </Transition>
        <Transition name="fade">
            <Nonogram ref="nonogram" :started="started" :paused="paused" />
        </Transition>
        <div class="actions-container">
            <span class="self-center text-xl" v-if="points && !started">
                {{ points }} pkt.
            </span>
            <Actions :started="started" @new-game="handleNewGame" @pause="handlePause" @check="handleCheck" @size="setSize" @reset-game="handleResetGame" @end-game="handleEndGame"/>
            <Score :time="counter" :points="points" :started="started"/>
        </div>
        <Summary ref="summary"></Summary>
        <Notification ref="notification" v-bind="notificationData" />
    </main>
</template>

<style scoped>
.view {
    @apply 
    relative;
}
.game-instructions {
    @apply 
    absolute
    w-full
    text-2xl
    font-thin 
    font-sans 
    text-center;
}
.actions-container {
    @apply 
    flex 
    flex-wrap-reverse 
    absolute
    bottom-0
    justify-end 
    w-full     
    gap-2;
}
</style>