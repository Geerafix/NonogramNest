<script setup>
import Header from '@/components/ui/Header.vue';
import Actions from '@/components/user/game-creation/Actions.vue';
import { ref } from 'vue';
import { set } from '@vueuse/core';
import NonogramBoard from '@/components/user/game-creation/NonogramBoard.vue';

const board = ref(null);
const isSizeSelected = ref(false);

const handleNewBoard = (size) => {
    board.value.setBoard(size);
    set(isSizeSelected, true);
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
        <Actions class="actions" @new-board="handleNewBoard"></Actions>
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
