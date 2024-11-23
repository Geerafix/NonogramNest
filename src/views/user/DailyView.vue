<script setup>
import Calendar from '@/components/user/daily-challenge/Calendar.vue';
import Streak from '@/components/user/daily-challenge/StreakMultiplier.vue';
import Nonogram from '@/components/user/game/Nonogram.vue';
import Score from '@/components/user/game/Score.vue';
import Actions from '@/components/user/game/Actions.vue';
import Summary from '@/components/user/game/Summary.vue';
import {onBeforeUnmount, ref} from 'vue';
import {
  getDailyChallenge,
  getDailyChallengeInfo,
  getStreak,
  postDailyChallenge,
  updateDailyChallenge
} from '@/services/dailyChallengeService';
import {postPuzzle} from '@/services/puzzleService';
import {useNotification} from '@/composables/useNotification';
import {useNonogram} from '@/composables/useNonogram';
import {useScore} from '@/composables/useScore';
import {calcTimeBonus, getPointsBySize} from "@/scripts/puzzleScripts.js";
import {achievementWatcher} from "@/composables/achievementWatcher.js";
import HelpChallenge from "@/components/user/other/HelpChallenge.vue";

const {notify} = useNotification();
const {watcher} = achievementWatcher();

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
    await postDailyChallenge(id, time.value, points.value, nonogram.value.nonogram.answers);
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
    const bonus = calcTimeBonus(time.value, 10);
    await updateDailyChallenge(nonogram.value.nonogram.answers, time.value, points.value, true, bonus);

    const streak = await getStreak().then(res => res.data) - 1;
    const streakPoints = (streak / 100) * getPointsBySize(boardSize.value);
    summary.value.show(points.value + streakPoints, bonus);
    clearPoints();
    resetBoard();
  }
  await watcher();
};

const endGame = async () => {
  await updateDailyChallenge(nonogram.value.nonogram.answers, time.value, points.value, false);
  clearPoints();
  resetBoard();
};

const displayChallengeInfo = async (date) => {
  const { data: info } = await getDailyChallengeInfo(date);

  if (info) {
    notify(true, `W tym dniu rozwiązano wyzwanie z punktacją ${info.points} w czasie ${info.time} s.`);
  } else {
    notify(false, `W tym dniu nie rozwiązano wyzwania.`);
  }
}

onBeforeUnmount(async () => {
  if (points.value) await endGame();
});
</script>

<template>
  <main>
    <Transition name="fetch-fade">
        <Calendar v-if="!started" @onClickedDay="displayChallengeInfo"/>
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
        <BasicButton @click="setDailyChallenge">
          Wykonaj <Icon icon="fa-solid fa-calendar-check" class="ml-0.5"/>
        </BasicButton>
      </div>
    </Transition>
    <HelpChallenge/>
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