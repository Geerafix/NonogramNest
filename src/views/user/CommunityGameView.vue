<script setup>
import Header from "@/components/shared/Header.vue";
import Nonogram from "@/components/user/game/Nonogram.vue";
import { getCommunityPuzzle } from "@/services/puzzleService.js";
import { set } from "@vueuse/core";
import { onMounted, ref} from "vue";
import { useRoute } from "vue-router";

const nonogram = ref(null);
const started = ref(false);
const paused = ref(true);
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

onMounted(fetchCommunityGame);
</script>

<template>
  <main class="view">
    <Header></Header>
    <Transition name="fade">
      <Nonogram ref="nonogram" :started="started" :paused="paused" />
    </Transition>
  </main>
</template>

<style scoped>
.view {
  @apply
  flex
  flex-col
}
</style>