<script setup>
import Header from '@/components/ui/Header.vue';
import Calendar from '@/components/ui/Calendar.vue';
import BasicButton from '@/components/ui/inputs/BasicButton.vue';
import Nonogram from '@/components/user/play/Nonogram.vue';
import Notification from '@/components/ui/Notification.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { set, useInterval } from '@vueuse/core';
import { getDailyChallenge, postDailyChallenge } from '@/services/dailyChallengeService';
import { postPuzzle } from '@/services/puzzleService';

const { counter, reset, pause, resume } = useInterval(1000, { controls: true });
const started = ref(false);
const notification = ref(null);
const nonogram = ref(null);
const settings = {
    message: 'Wykonano zadanie. Wróć jutro.',
    status: true,
    time: 2000
};

const handleDailyChallenge = async () => {
    const dailyChallenge = await getDailyChallenge().then((res) => res.data);
    if (!dailyChallenge) {
        set(started, true);
        nonogram.value.nonogram.size = 8;
        nonogram.value.handleNewPuzzle();
        await postPuzzle(
            nonogram.value.nonogram.cluesX, 
            nonogram.value.nonogram.cluesY, 
            nonogram.value.nonogram.size
        )
            .then((res) => { nonogram.value.nonogram.id = res.data.id });

        await postDailyChallenge(
            nonogram.value.nonogram.id, 
            counter.value,
            nonogram.value.nonogram.points
        );
    } else {
        set(started, true);
        nonogram.value.nonogram.paused = false;
        nonogram.value.nonogram.size = 8;
        nonogram.value.nonogram.cluesX = JSON.parse(dailyChallenge.Puzzle.clues_x);
        nonogram.value.nonogram.cluesY = JSON.parse(dailyChallenge.Puzzle.clues_y);
        nonogram.value.nonogram.answers = Array.from(Array(8), () => Array(8).fill(0));
    }
};

onMounted(() => {

});

onUnmounted(() => {

});
</script>

<template>
    <main class="relative">
        <Header></Header>
        <Notification ref="notification" v-bind="settings" />
        <div class="daily-challenge-container" v-show="!started">
            <Calendar></Calendar>
            <BasicButton class="w-fit mx-auto" @click="handleDailyChallenge">Wykonaj</BasicButton>
        </div> 
        <div v-show="started">
            <Nonogram ref="nonogram"></Nonogram>
        </div> 
    </main>
</template>

<style scoped>
.daily-challenge-container {
    @apply 
    flex
    flex-col
    mx-auto
    w-fit 
    gap-8; 
}
</style>
