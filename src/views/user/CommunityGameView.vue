<script setup>
import Nonogram from "@/components/user/game/Nonogram.vue";
import Actions from "@/components/user/game/Actions.vue";
import {getCommunityPuzzle} from "@/services/communityService.js";
import {set} from "@vueuse/core";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useNotification} from "@/composables/useNotification";
import {useNonogram} from "@/composables/useNonogram.js";

const started = ref(false);
const paused = ref(true);
const nonogram = ref(null);
const {checkSolution} = useNonogram(nonogram);

const route = useRoute();
const router = useRouter();

const {notify} = useNotification();

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
  const {isSolved} = checkSolution();
  if (!isSolved) {
    notify(false, 'Twoje rozwiązanie jest niepoprawne.');
  } else {
    await handleEndGame();
    notify(true, 'Rozwiązano nonogram.', 4000);
  }
};

const handleEndGame = () => (router.push({name: 'Community'}));

onMounted(fetchCommunityGame);
</script>

<template>
  <main>
    <Transition name="fade">
      <Nonogram ref="nonogram" :started="started" :paused="paused"/>
    </Transition>
    <Transition name="slide-down-no-leave">
      <div class="actions" v-if="started">
        <Actions :started="started" :paused="paused" @pause="handlePause" @check="handleCheck" @end-game="handleEndGame"/>
      </div>
    </Transition>
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