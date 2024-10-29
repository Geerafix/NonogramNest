<script setup>
import Header from '@/components/shared/Header.vue';
import Calendar from '@/components/user/daily-challenge/Calendar.vue';
import BasicButton from '@/components/shared/inputs/BasicButton.vue';
import Streak from '@/components/user/daily-challenge/Streak.vue';
import Nonogram from '@/components/user/game/Nonogram.vue';
import Notification from '@/components/shared/Notification.vue';
import Score from '@/components/user/game/Score.vue';
import Actions from '@/components/user/game/Actions.vue';
import Summary from '@/components/user/game/Summary.vue';
import {onBeforeUnmount, ref} from 'vue';
import {getDailyChallenge, postDailyChallenge, updateDailyChallenge} from '@/services/dailyChallengeService';
import {postPuzzle} from '@/services/puzzleService';
import {useNotification} from '@/composables/useNotification';
import {useNonogram} from '@/composables/useNonogram';
import {useScore} from '@/composables/useScore';
import {calcTimeBonus, getPointsBySize} from "@/scripts/puzzleScripts.js";

const notification = ref(null);
const {notify} = useNotification(notification);

const nonogram = ref(null);
const {setBoardSize, setNewBoard, checkSolution, resetBoard, cluesX, cluesY, boardSize} = useNonogram(nonogram);

const summary = ref(null);
const {setPoints, clearPoints, startTime, setTime, pauseTime, time, points, paused, started} = useScore();

const setDailyChallenge = async () => {
  const dailyChallenge = await getDailyChallenge().then((res) => res.data);
  if (!dailyChallenge) {
    setPoints(getPointsBySize(10));
    setBoardSize(10);
    setNewBoard();
    const id = await postPuzzle(cluesX.value, cluesY.value, boardSize.value).then((res) => res.data.id);
    await postDailyChallenge(id, time.value, points.value);
  } else if (dailyChallenge && !dailyChallenge.is_solved) {
    setPoints(dailyChallenge.points);
    setTime(dailyChallenge.time);
    setBoardSize(10);
    nonogram.value.nonogram.cluesX = JSON.parse(dailyChallenge.Puzzle.clues_x);
    nonogram.value.nonogram.cluesY = JSON.parse(dailyChallenge.Puzzle.clues_y);
    nonogram.value.nonogram.answers = JSON.parse(dailyChallenge.answers);
  } else {
    notify(true, 'Wykonano dzisiejsze wyzwanie. Wróć jutro.');
    return;
  }
  startTime();
};

const checkGame = async () => {
  const {isSolved, lostPoints} = checkSolution();
  if (!isSolved) {
    const diff = (points.value - lostPoints >= 0) ? points.value - lostPoints : 0;
    setPoints(diff);
    notify(false, `Twoje rozwiązanie jest niepoprawne. Tracisz ${lostPoints} pkt.`);
  } else {
    const bonus = calcTimeBonus(time.value, 8)
    await updateDailyChallenge(nonogram.value.nonogram.answers, time.value, points.value + bonus, true);
    summary.value.show(points.value, bonus);
    endGame();
  }
};

const endGame = async () => {
  await updateDailyChallenge(nonogram.value.nonogram.answers, time.value, points.value, false);
  clearPoints();
  resetBoard();
};

onBeforeUnmount(async () => {
  if (nonogram.value.nonogram.answers && points.value) {
    await updateDailyChallenge(nonogram.value.nonogram.answers, time.value, points.value, false);
  }
});
</script>

<template>
  <main>
    <Header/>
    <Transition name="fetch-fade">
        <Calendar v-if="!started" />
    </Transition>
    <Transition name="fade">
      <Nonogram ref="nonogram" v-bind="{started, paused}"/>
    </Transition>
    <Transition name="slide-down-no-leave">
      <div class="actions" v-if="started">
        <Actions v-bind="{started, paused}" @pause="pauseTime" @check="checkGame" @end-game="endGame"/>
        <Score v-bind="{time, points, started}"/>
      </div>
    </Transition>
    <Summary ref="summary" />
    <Transition name="slide-down-no-leave">
      <div class="controls" v-if="!started">
        <Streak/>
        <BasicButton @click="setDailyChallenge">Wykonaj</BasicButton>
      </div>
    </Transition>
    <Notification ref="notification"/>
  </main>
</template>

<style scoped>
.actions {
  @apply
  absolute
  flex
  flex-wrap-reverse
  gap-2
  justify-end
  bottom-0
  right-0
}
.controls {
  @apply
  flex
  gap-2
  absolute
  right-0
  bottom-0
}
</style>