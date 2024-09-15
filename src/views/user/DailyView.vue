<script setup>
import Header from '@/components/ui/Header.vue';
import Calendar from '@/components/ui/Calendar.vue';
import BasicButton from '@/components/ui/inputs/BasicButton.vue';
import Streak from '@/components/ui/Streak.vue';
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
const points = ref(0);

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
        nonogram.value.nonogram.answers = JSON.parse(dailyChallenge.answers);
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
        await updateDailyChallenge(nonogram.value.nonogram.answers, counter.value, points.value, true);
        summary.value.show(points.value);
        handleEndGame();    
    }
};

const handleResetGame = () => {
    counter.value = 0;
    set(points, Math.pow(8, 2) * 8);
    nonogram.value.resetGame(2);
};

const handleEndGame = async () => {
    await updateDailyChallenge(nonogram.value.nonogram.answers, counter.value, points.value, false);
    set(started, false);
    set(paused, true);
    set(points, null);
    nonogram.value.resetGame(1);
    pause();
};

onMounted(() => {
    pause();
});

onBeforeUnmount(async () => {
    await updateDailyChallenge(nonogram.value.nonogram.answers, counter.value, points.value, false);
});

watch(paused, (newValue) => newValue ? pause() : resume() );
</script>

<template>
    <main class="view">
        <Header></Header>
        <Transition name="fade">
            <div class="daily-challenge-container" v-if="!started" >
                <Calendar />
                <div class="flex justify-between">
                    <Streak />
                    <BasicButton class="" @click="handleDailyChallenge">Wykonaj</BasicButton>
                </div>
            </div> 
        </Transition>
        <Transition name="fade">
            <Nonogram ref="nonogram" :started="started" :paused="paused" />
        </Transition>
        <Transition name="slide-down-no-leave">
            <div class="actions" v-if="started">
                <Actions :started="started" :paused="paused" @pause="handlePause" @check="handleCheck" @reset-game="handleResetGame" @end-game="handleEndGame" />
                <Score :time="counter" :points="points" :started="started" />
            </div>
        </Transition>
        <Summary ref="summary"></Summary>
        <Notification ref="notification" v-bind="notificationData" />
    </main>
</template>

<style scoped>
.view {
    @apply
    relative
}
.daily-challenge-container {
    @apply 
    grid
    absolute
    left-1/2
    -translate-x-1/2
    items-center
    w-fit 
    gap-4;
}
.actions {
    @apply 
    absolute
    flex 
    flex-wrap-reverse 
    justify-end 
    bottom-0
    gap-2
    w-full;     
}
</style>
