<script setup>
import Header from '@/components/shared/Header.vue';
import Actions from '@/components/user/game-creation/Actions.vue';
import NonogramBoard from '@/components/user/game-creation/NonogramBoard.vue';
import Notification from '@/components/shared/Notification.vue';
import {postCommunityPuzzle} from '@/services/communityService.js';
import {generateGame} from '@/scripts/puzzleScripts';
import {ref} from 'vue';
import {set} from '@vueuse/core';
import {useNotification} from '@/composables/useNotification';

const board = ref(null);
const notification = ref(null);
const {notify} = useNotification(notification);

const isSizeSelected = ref(false);

const handleNewBoard = (size) => {
  board.value.setBoard(size);
  set(isSizeSelected, size !== null ? size : null);
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
    } else {
      notify(false, 'Nie wpisano nazwy planszy.');
    }
  } else {
    notify(false, 'Nie wybrano rozmiaru planszy.');
  }
};
</script>

<template>
  <main>
    <Header/>
    <Transition name="fade" v-if="!isSizeSelected">
      <div class="game-instructions">
        <p>Wybierz rozmiar planszy nonogramu,<br>aby rozpocząć tworzenie gry.</p>
      </div>
    </Transition>
    <Transition name="fade">
      <NonogramBoard ref="board" v-show="isSizeSelected" />
    </Transition>
    <Actions class="actions" :isCreating="isSizeSelected" @new-board="handleNewBoard" @clear-board="handleClearBoard" @submit="handleSubmitGame" />
    <Notification ref="notification" />
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
