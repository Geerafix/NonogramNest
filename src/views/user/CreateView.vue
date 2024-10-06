<script setup>
import Header from '@/components/shared/Header.vue';
import Actions from '@/components/user/game-creation/Actions.vue';
import NonogramBoard from '@/components/user/game-creation/NonogramBoard.vue';
import Notification from '@/components/shared/Notification.vue';
import {postCommunityPuzzle} from '@/services/communityService.js';
import {generateGame} from '@/scripts/puzzleScripts';
import {reactive, ref} from 'vue';
import {set} from '@vueuse/core';

const board = ref(null);
const isSizeSelected = ref(false);

const notification = ref(null);
const notificationData = reactive({message: '', status: true, time: 2500});

const handleNewBoard = (size) => {
  board.value.setBoard(size);
  set(isSizeSelected, true);
};

const handleClearBoard = () => {
  board.value.clearBoard();
};

const handleSubmitGame = async (name) => {
  if (isSizeSelected.value) {
    if (name.length > 0) {
      const nonogram = generateGame(board.value.answers);
      board.value.clearBoard();

      await postCommunityPuzzle(
          name,
          nonogram.cluesX,
          nonogram.cluesY,
          board.value.answers.length,
          nonogram.excludedTiles
      );

      showNotification(true, 'Zapisano nonogram');
      set(isSizeSelected, false);
    } else {
      showNotification(false, 'Nie wpisano nazwy planszy');
    }
  } else {
    showNotification(false, 'Nie wybrano rozmiaru planszy');
  }
};

const showNotification = (status, message) => {
  Object.assign(notificationData, { status: status, message: message });
};
</script>

<template>
  <main class="view">
    <Header></Header>
    <Transition name="fade" v-if="!isSizeSelected">
      <div class="game-instructions">
        <p>Wybierz rozmiar planszy nonogramu.<br>Naciśnij przycisk z plusem, aby rozpocząć tworzenie gry.</p>
      </div>
    </Transition>
    <Transition name="fade">
      <NonogramBoard ref="board" v-show="isSizeSelected"></NonogramBoard>
    </Transition>
    <Actions class="actions" 
            :isCreating="isSizeSelected"
            @new-board="handleNewBoard" 
            @clear-board="handleClearBoard"
            @submit="handleSubmitGame">
    </Actions>
    <Notification ref="notification" v-bind="notificationData"/>
  </main>
</template>

<style scoped>
.view {
  @apply
  relative
}

.game-instructions {
  @apply
  absolute
  w-full
  text-2xl
  font-thin
  font-sans
  text-center;
}

.board {
  @apply
  grid
  grid-cols-[min-content_1fr]
  w-fit
  mx-auto
  z-10;
}

.actions {
  @apply
  absolute
  bottom-0
  right-0
}
</style>
