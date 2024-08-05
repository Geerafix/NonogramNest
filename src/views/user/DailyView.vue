<script setup>
import Header from '@/components/ui/Header.vue';
import Calendar from '@/components/ui/Calendar.vue';
import BasicButton from '@/components/ui/inputs/BasicButton.vue';
import Nonogram from '@/components/user/play/Nonogram.vue';
import Notification from '@/components/ui/Notification.vue';
import Score from '@/components/user/play/Score.vue';
import Actions from '@/components/user/play/Actions.vue';
import Summary from '@/components/user/play/Summary.vue';
import { ref, reactive, watch, onMounted, onBeforeUnmount } from 'vue';
import { set, useInterval } from '@vueuse/core';
import { getDailyChallenge, postDailyChallenge, updateDailyChallenge } from '@/services/dailyChallengeService';
import { postPuzzle } from '@/services/puzzleService';

const { counter, reset, pause, resume } = useInterval(1000, { controls: true });

const summary = ref(null);

const started = ref(false);
const paused = ref(true);

const nonogram = ref(null);
const points = ref(null);

const notification = ref(null);
const notificationData = reactive({ message: '', status: true, time: 3000 });

const handleDailyChallenge = async () => {
    const dailyChallenge = await getDailyChallenge().then((res) => res.data);
    if (!dailyChallenge) {
        set(points, Math.pow(8, 2) * 8);
        nonogram.value.nonogram.size = 8;
        nonogram.value.newGame();
        await postPuzzle(
            nonogram.value.nonogram.cluesX, 
            nonogram.value.nonogram.cluesY, 
            nonogram.value.nonogram.size )
            .then((res) => { nonogram.value.nonogram.id = res.data.id });

        await postDailyChallenge(nonogram.value.nonogram.id, 0, points.value);
    } else if (dailyChallenge && !dailyChallenge.is_solved) {
        set(points, dailyChallenge.points);
        set(counter, dailyChallenge.time);
        nonogram.value.nonogram.size = 8;
        nonogram.value.nonogram.cluesX = JSON.parse(dailyChallenge.Puzzle.clues_x);
        nonogram.value.nonogram.cluesY = JSON.parse(dailyChallenge.Puzzle.clues_y);
        nonogram.value.nonogram.answers = Array.from(Array(8), () => Array(8).fill(0));
    } else {
        notificationData.message = `Wykonano dzisiejsze wyzwanie. Wróć jutro.`;
        notificationData.status = true;
        notification.value.start();
        return;
    }
    set(started, true);
};

const handlePause = () => {
    set(paused, !paused.value);
};

const handleCheck = async () => {
    const data = nonogram.value.checkSolution();
    if (!data.isSolved) {
        set(points, (points.value - data.lostPoints >= 0) ? points.value - data.lostPoints : 0);
        notificationData.message = `Twoje rozwiązanie jest niepoprawne. Tracisz ${data.lostPoints} pkt.`;
        notificationData.status = false;
        notification.value.start();
    } else {
        await updateDailyChallenge(counter.value, points.value, true);
        summary.value.show(points.value);
        handleEndGame();    
    }
};

const handleEndGame = async () => {
    await updateDailyChallenge(counter.value, points.value, false);
    set(started, false);
    set(paused, true);
    set(points, null);
    nonogram.value.resetGame();
    pause();
};

onMounted(() => {
    pause();
});

onBeforeUnmount(async () => {
    if (points.value) await updateDailyChallenge(counter.value, points.value, false);
});

watch(paused, (newValue) => newValue ? pause() : resume() );
</script>

<template>
    <main class="relative">
        <Header></Header>
        <Notification ref="notification" v-bind="notificationData" />
        <Transition name="fade">
            <div v-if="!started" class="daily-challenge-container">
                <Calendar />
                <Icon class="text-3xl text-orange-400" icon="fa-solid fa-fire" />
                <BasicButton class="w-fit mx-auto " @click="handleDailyChallenge">Wykonaj</BasicButton>
            </div> 
        </Transition>
        <Transition name="fade">
            <Nonogram ref="nonogram" :started="started" :paused="paused" />
        </Transition>
        <Summary ref="summary"></Summary>
        <div v-if="started" class="actions">
            <Actions :started="started" :paused="paused" @pause="handlePause" @check="handleCheck" @end-game="handleEndGame"/>
            <Score :time="counter" :points="points" :started="started"/>
        </div>
    </main>
</template>

<style scoped>
.daily-challenge-container {
    @apply 
    flex
    flex-col
    absolute
    w-full 
    gap-4;
}
.actions {
    @apply 
    absolute
    bottom-0
    flex 
    flex-wrap-reverse 
    justify-end 
    w-full     
    gap-2;
}
</style>
