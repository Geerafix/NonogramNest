<script setup>
import Nonogram from '@/components/user/play/Nonogram.vue';
import Score from "@/components/user/play/Score.vue";
import Actions from "@/components/user/play/Actions.vue";
import Header from "@/components/ui/Header.vue"
import Notification from '@/components/ui/Notification.vue';
import Summary from '@/components/user/play/Summary.vue';
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
    resume();
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

const handleEndGame = () => {
    set(started, false);
    set(points, null);
    nonogram.value.resetGame();
    pause();
}

watch(paused, (newValue) => newValue ? pause() : resume() );
</script>

<template>
    <main class="view">
        <Header></Header>
        <div class="game-container">
            <Notification ref="notification" :message="notificationData.message" :status="notificationData.status" />
            <Transition name="fade">
                <div class="info" v-if="!started">
                    <p>Wybierz rozmiar planszy nonogramu.</p>
                    <p>Naciśnij przycisk z plusem, aby rozpocząć grę.</p>
                </div>
            </Transition>
            <Transition name="fade">
                <Nonogram ref="nonogram" :started="started" :paused="paused" />
            </Transition>
            <Summary ref="summary"></Summary>
            <div class="actions">
                <span class="self-center text-xl" v-if="points && !started">{{ points }} pkt.</span>
                <Actions :started="started" @new-game="handleNewGame" @pause="handlePause" @check="handleCheck" @size="setSize" @end-game="handleEndGame"/>
                <Score :time="counter" :points="points" :started="started"/>
            </div>
        </div>
    </main>
</template>

<style scoped>
.view {
    @apply 
    flex 
    flex-col 
    relative;
}
.game-container {
    @apply 
    flex 
    flex-col 
    justify-between 
    h-full;
}
.info {
    @apply 
    absolute
    w-full
    text-2xl
    font-thin 
    font-sans 
    text-center;
}
.actions {
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