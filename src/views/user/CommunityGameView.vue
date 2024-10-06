<script setup>
import Header from "@/components/shared/Header.vue";
import Nonogram from "@/components/user/game/Nonogram.vue";
import Actions from "@/components/user/game/Actions.vue";
import {getCommunityPuzzle} from "@/services/communityService.js";
import {set} from "@vueuse/core";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const started = ref(false);
const paused = ref(true);
const nonogram = ref(null);
const route = useRoute();

const fetchCommunityGame = async () => {
  const communityPuzzle = await getCommunityPuzzle(route.params.id).then((res) => res.data);
  nonogram.value.nonogram.size = communityPuzzle.size;
  nonogram.value.nonogram.cluesX = JSON.parse(communityPuzzle.clues_x);
  nonogram.value.nonogram.cluesY = JSON.parse(communityPuzzle.clues_y);
  nonogram.value.nonogram.answers = JSON.parse(communityPuzzle.excluded_tiles);

  set(started, true);
  set(paused, false);
};

const handlePause = () => {

};

const handleCheck = async () => {

};

const handleResetGame = () => {

};

const handleEndGame = () => {

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
  </main>
</template>

<style scoped>
.view {
  @apply
  relative
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