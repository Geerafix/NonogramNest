<script setup>
import Nonogram from '@/components/user/game/Nonogram.vue';
import Score from "@/components/user/game/Score.vue";
import Actions from "@/components/user/game/Actions.vue";
import Summary from '@/components/user/game/Summary.vue';
import HelpClassic from "@/components/user/other/HelpClassic.vue";
import {onBeforeUnmount, onMounted, ref} from 'vue';
import {useScore} from '@/composables/useScore';
import {postPuzzle, postSolvedPuzzle} from '@/services/puzzleService';
import {useNotification} from '@/composables/useNotification';
import {useNonogram} from '@/composables/useNonogram';
import {calcTimeBonus, getPointsBySize} from "@/scripts/puzzleScripts.js";
import {achievementWatcher} from "@/composables/achievementWatcher.js";
import {useNonogramStore} from "@/store.js";

const {notify} = useNotification();
const {watcher} = achievementWatcher();

const nonogram = ref(null);
const {setBoardSize, setNewBoard, checkSolution, resetBoard, cluesX, cluesY, boardSize} = useNonogram(nonogram);
const nonogramStore = useNonogramStore();

const summary = ref(null);
const {setPoints, clearPoints, startTime, pauseTime, resetTime, time, points, paused, started} = useScore();

const setGame = (size) => {
  setBoardSize(size);
  setPoints(getPointsBySize(size));
};

const startGame = () => {
  setNewBoard();
  resetTime();
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
  await watcher();
};

const endGame = () => {
  resetBoard();
  clearPoints();
  nonogramStore.remove();
};

onBeforeUnmount(() => {
  if (started.value) {
    nonogramStore.save(nonogram, time, points);
  }
});

onMounted(() => {
  if (nonogramStore.isSaved()) {
    nonogramStore.load(nonogram, time, points, started, pauseTime);
  }
});
</script>

<template>
  <main>
    <div v-if="!started" class="game-instructions">
      <p>Wybierz rozmiar planszy nonogramu. Naciśnij przycisk z kontrolerem, aby rozpocząć grę.</p>
    </div>
    <Transition name="fade">
      <Nonogram ref="nonogram" v-bind="{started, paused}"/>
    </Transition>
    <div class="actions-container">
      <Transition name="slide-right-no-leave">
        <span v-if="points && !started" class="self-center text-xl">{{ points }} pkt.</span>
      </Transition>
      <Actions v-bind="{started, paused}"
               @check="checkGame" @pause="pauseTime" @size="setGame" @new-game="startGame" @end-game="endGame"/>
      <Score v-bind="{time, points, started}"/>
    </div>
    <HelpClassic/>
    <Summary ref="summary"/>
  </main>
</template>

<style scoped>
.game-instructions {
  @apply
  text-2xl
  text-center;
}

.actions-container {
  @apply
  flex
  flex-wrap-reverse
  justify-end
  absolute
  bottom-0
  right-0
  gap-2;
}
</style>