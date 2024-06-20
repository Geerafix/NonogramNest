<script setup>
import Nonogram from '@/components/user/play/Nonogram.vue';
import Score from "@/components/user/play/Score.vue";
import Actions from "@/components/user/play/Actions.vue";
import Header from "@/components/ui/Header.vue"
import { useInterval } from '@vueuse/core';
import { watch, ref, reactive } from 'vue';
import Notification from '@/components/ui/Notification.vue';
import Summary from '@/components/user/play/Summary.vue';
import { postPuzzle, postSolvedPuzzle } from '@/services/puzzleService';

const { counter, reset, pause, resume } = useInterval(1000, { controls: true });
const nonogram = ref({});
const notification = ref(null);
const summary = ref(null);
const notificationData = reactive({
    msg: '',
    status: true,
    time: 2500
});
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
    const data = nonogram.value.handleCheck();
    if (!data.isSolved) {
        notificationData.msg = `Twoje rozwiązanie jest niepoprawne. Tracisz ${data.lostPoints} pkt.`;
        notificationData.status = false;
        notification.value.start();
    } else {
        summary.value.display(nonogram.value.nonogram.points);
        handleEndGame();
    }
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
    <main class="flex flex-col relative">
        <Header></Header>
        <div class="flex flex-col justify-between h-full">
            <Notification ref="notification" :msg="notificationData.msg" :status="notificationData.status"></Notification>
            <div :class="['info', {'hidden': started}]">
                <span>Wybierz rozmiar planszy nonogramu.</span><br>
                <span>Naciśnij przycisk z plusem, aby rozpocząć grę.</span>
            </div>
            <Nonogram ref="nonogram" :class="{'hidden': !started}" />
            <Summary ref="summary"></Summary>
            <div :class="['actions']">
                <Actions :started="started" @new-game="handleNewPuzzle" @pause="handlePause" @check="handleCheck" @size="setSize" @end-game="handleEndGame"/>
                <Score v-if="started" :counter="counter" :points="nonogram.nonogram.points" />
            </div>
        </div>
    </main>
</template>

<style scoped>
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