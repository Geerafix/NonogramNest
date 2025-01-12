<script setup>
import Actions from '@/components/user/game-creation/Actions.vue';
import NonogramBoard from '@/components/user/game-creation/NonogramBoard.vue';
import HelpCreate from "@/components/user/other/HelpCreate.vue";
import {postCommunityPuzzle} from '@/services/communityService.js';
import {generateGame} from '@/scripts/puzzleScripts';
import {onBeforeUnmount, onMounted, ref} from 'vue';
import {set} from '@vueuse/core';
import {useNotification} from '@/composables/useNotification';
import {useCreatedStore} from "@/store.js";

const isSizeSelected = ref(false);
const board = ref(null);
const boardStore = useCreatedStore();
const {notify} = useNotification();

const handleNewBoard = (size) => {
  board.value.setBoard(size);
  set(isSizeSelected, size !== null ? size : null);
  typeof size === 'undefined' ? boardStore.remove() : null;
};

const handleClearBoard = () => {
  board.value.clearBoard();
};

const handleSubmitGame = async (name) => {
  if (isSizeSelected.value) {
    if (name.length > 0) {
      set(isSizeSelected, false);
      notify(true, 'Wysłano planszę do weryfikacji.');
      const dCopy = JSON.parse(JSON.stringify(board.value.answers));
      const nonogram = generateGame(dCopy);
      await postCommunityPuzzle(name, nonogram.cluesX, nonogram.cluesY, board.value.answers.length, board.value.answers);
      board.value.clearBoard();
      boardStore.remove();
    } else {
      notify(false, 'Nie wpisano nazwy planszy.');
    }
  } else {
    notify(false, 'Nie wybrano rozmiaru planszy.');
  }
};

onBeforeUnmount(() => {
  if (isSizeSelected.value) {
    boardStore.save(board);
  }
});

onMounted(() => {
  if (boardStore.isSaved()) {
    boardStore.load(board, isSizeSelected);
  }
});
</script>

<template>
  <main>
    <Transition v-if="!isSizeSelected" name="fade">
      <div class="game-instructions">
        <p>Wybierz rozmiar planszy nonogramu, aby rozpocząć tworzenie gry.</p>
      </div>
    </Transition>
    <Transition name="fade">
      <NonogramBoard v-show="isSizeSelected" ref="board"/>
    </Transition>
    <Actions :isCreating="isSizeSelected" class="actions" @submit="handleSubmitGame" @new-board="handleNewBoard"
             @clear-board="handleClearBoard"/>
    <HelpCreate/>
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

.actions {
  @apply
  absolute
  bottom-0
  right-0
}
</style>
