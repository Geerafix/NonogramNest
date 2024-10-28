<script setup>
import Nonogram from '@/components/user/game/Nonogram.vue';
import Score from "@/components/user/game/Score.vue";
import Actions from "@/components/user/game/Actions.vue";
import Header from "@/components/shared/Header.vue"
import Notification from '@/components/shared/Notification.vue';
import Summary from '@/components/user/game/Summary.vue';
import {ref} from 'vue';
import {useScore} from '@/composables/useScore';
import {postPuzzle, postSolvedPuzzle} from '@/services/puzzleService';
import {useNotification} from '@/composables/useNotification';
import {useNonogram} from '@/composables/useNonogram';
import {calcTimeBonus, getPointsBySize} from "@/scripts/puzzleScripts.js";

const notification = ref(null);
const {notify} = useNotification(notification);

const nonogram = ref(null);
const {setBoardSize, setNewBoard, checkSolution, resetBoard, cluesX, cluesY, boardSize} = useNonogram(nonogram);

const summary = ref(null);
const {setPoints, clearPoints, startTime, pauseTime, time, points, paused, started} = useScore();

const setGame = (size) => {
  setBoardSize(size);
  setPoints(getPointsBySize(size));
};

const startGame = () => {
  setNewBoard();
  startTime();
};

const checkGame = async () => {
  const {isSolved, lostPoints} = checkSolution();
  if (!isSolved) {
    const diff = (points.value - lostPoints >= 0) ? points.value - lostPoints : 0;
    setPoints(diff);
    notify(false, `Twoje rozwiązanie jest niepoprawne. Tracisz ${lostPoints} pkt.`);
  } else {
    const id = await postPuzzle(cluesX.value, cluesY.value, boardSize.value).then((res) => res.data.id);
    const bonus = calcTimeBonus(time.value, boardSize.value);
    await postSolvedPuzzle(id, time.value, points.value + bonus);
    summary.value.show(points.value, bonus);
    endGame();
  }
};

const endGame = () => {
  resetBoard();
  clearPoints();
};
</script>

<template>
  <main>
    <Header></Header>
    <Transition name="fade">
      <div class="game-instructions" v-if="!started">
        <p>Wybierz rozmiar planszy nonogramu.<br>Naciśnij przycisk z kontrolerem, aby rozpocząć grę.</p>
      </div>
    </Transition>
    <Transition name="fade">
      <Nonogram ref="nonogram" v-bind="{started, paused}"/>
    </Transition>
    <div class="actions-container">
      <Transition name="slide-right-no-leave">
        <span class="self-center text-xl" v-if="points && !started">{{points}} pkt.</span>
      </Transition>
      <Actions v-bind="{started, paused}" @new-game="startGame" @pause="pauseTime" @check="checkGame"
               @size="setGame" @end-game="endGame"/>
      <Score v-bind="{time, points, started}"/>
    </div>
    <Summary ref="summary"></Summary>
    <Notification ref="notification"/>
  </main>
</template>

<style scoped>
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