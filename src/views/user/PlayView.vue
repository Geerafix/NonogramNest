<script setup>
import Nonogram from '@/components/user/play/Nonogram.vue';
import Score from "@/components/user/play/Score.vue";
import Actions from "@/components/user/play/Actions.vue";
import Header from "@/components/ui/Header.vue"
import Notification from '@/components/ui/Notification.vue';
import Summary from '@/components/user/play/Summary.vue';
import { set, useInterval } from '@vueuse/core';
import { watch, ref, reactive, onMounted, onUnmounted } from 'vue';
import { postPuzzle, postSolvedPuzzle } from '@/services/puzzleService';

const { counter, reset, pause, resume } = useInterval(1000, { controls: true });

const nonogram = ref({});

const summary = ref(null);

const paused = ref(true);
const started = ref(false);

const notification = ref(null);
const notificationData = reactive({message: '', status: true, time: 2500});

const setSize = (size) =>  { nonogram.value.nonogram.size = size; };

const handleNewPuzzle = () => {
    set(started, true);
    set(paused, false);
    nonogram.value.handleNewPuzzle();
    reset();
    resume();
};

const handlePause = () => {
    paused.value = !paused.value;
    nonogram.value.nonogram.paused = !nonogram.value.nonogram.paused;
};

const handleCheck = async () => {
    const data = nonogram.value.handleCheck();
    if (!data.isSolved) {
        notificationData.message = `Twoje rozwiązanie jest niepoprawne. Tracisz ${data.lostPoints} pkt.`;
        notificationData.status = false;
        notification.value.start();
    } else {
        await postPuzzle(nonogram.value.nonogram.cluesX, nonogram.value.nonogram.cluesY, nonogram.value.nonogram.size)
            .then((res) => { nonogram.value.nonogram.id = res.data.id });
        await postSolvedPuzzle(nonogram.value.nonogram.id, counter.value, nonogram.value.nonogram.points);
        summary.value.display(nonogram.value.nonogram.points);
        handleEndGame();    
    }
};

const handleEndGame = () => {
    set(started, false);
    nonogram.value.handleEndGame();
    pause();
}

watch(paused, (newPaused) => {
    newPaused ? pause() : resume();
    nonogram.value.nonogram.paused = newPaused;
});
</script>

<template>
    <main class="view">
        <Header></Header>
        <div class="game-container">
            <Notification ref="notification" :message="notificationData.message" :status="notificationData.status" />
            <div :class="['info']" v-show="!started">
                <p>Wybierz rozmiar planszy nonogramu.</p>
                <p>Naciśnij przycisk z plusem, aby rozpocząć grę.</p>
            </div>
            <Nonogram ref="nonogram" v-show="started" />
            <Summary ref="summary"></Summary>
            <div class="actions">
                <Actions :started="started" @new-game="handleNewPuzzle" @pause="handlePause" @check="handleCheck" @size="setSize" @end-game="handleEndGame"/>
                <Score v-if="started" :counter="counter" :points="nonogram.nonogram.points" />
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