<script setup>
import Header from "@/components/shared/Header.vue";
import Nonogram from "@/components/user/game/Nonogram.vue";
import Actions from "@/components/user/game/Actions.vue";
import Notification from "@/components/shared/Notification.vue";
import {getCommunityPuzzle} from "@/services/communityService.js";
import {set} from "@vueuse/core";
import {onMounted, ref, reactive} from "vue";
import {useRoute, useRouter} from "vue-router";

const started = ref(false);
const paused = ref(true);
const nonogram = ref(null);

const route = useRoute();
const router = useRouter();

const notification = ref(null);
const notificationData = reactive({message: '', status: true, time: 2500});

const fetchCommunityGame = async () => {
  const communityPuzzle = await getCommunityPuzzle(route.params.id).then((res) => res.data);
  nonogram.value.nonogram.id = communityPuzzle.puzzle_id;
  nonogram.value.nonogram.size = communityPuzzle.size;
  nonogram.value.nonogram.cluesX = JSON.parse(communityPuzzle.clues_x);
  nonogram.value.nonogram.cluesY = JSON.parse(communityPuzzle.clues_y);
  nonogram.value.nonogram.answers = JSON.parse(communityPuzzle.excluded_tiles);

  set(started, true);
  set(paused, false);
};

const handlePause = () => {
  paused.value = !paused.value;
};

const handleCheck = async () => {
  const data = nonogram.value.checkSolution();
  if (!data.isSolved) {
    Object.assign(notificationData, {status: false, message: 'Twoje rozwiązanie jest niepoprawne.'});
    notification.value.start();
  } else {
    handleEndGame();
  }
};

const handleResetGame = () => {
  nonogram.value.resetGame(2);
};

const handleEndGame = () => {
  router.push({name: 'Community'});
}

onMounted(fetchCommunityGame);
</script>

<template>
  <main class="view">
    <Header></Header>
    <Transition name="fade">
      <Nonogram ref="nonogram" :started="started" :paused="paused"/>
    </Transition>
    <Transition name="slide-down-no-leave">
      <div class="actions" v-if="started">
        <Actions :started="started" :paused="paused" @pause="handlePause" @check="handleCheck"
                 @reset-game="handleResetGame" @end-game="handleEndGame"/>
      </div>
    </Transition>
    <Notification ref="notification" v-bind="notificationData"/>
  </main>
</template>

<style scoped>
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