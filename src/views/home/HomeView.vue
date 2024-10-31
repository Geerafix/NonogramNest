<script setup>
import Nonogram from '@/components/user/game/Nonogram.vue';
import {onMounted, ref, watch} from 'vue';
import {useInterval, useTimeout} from '@vueuse/core';
import {useNonogram} from '@/composables/useNonogram';

const {counter, resume} = useInterval(700, {controls: true});

const nonogram = ref(null);
const {setNewBoard, setBoardSize, paintTile, answers} = useNonogram(nonogram);

const size = 10;

const iterator = ref(0);

watch(counter, () => {
  const x = Math.floor(Math.random() * size);
  const y = Math.floor(Math.random() * size);
  if (answers.value[y][x] !== -1) {
    paintTile(x, y);
  }
});

onMounted(() => {
  setBoardSize(size);
  setNewBoard()
  resume();
  displaySlogan();
});

const displaySlogan = () => {
  setTimeout(() => {
    iterator.value += 1;
    if (iterator.value < 4) {
      displaySlogan();
    }
  }, 1000);
};
</script>

<template>
  <main class="bg-gradient-to-b from-gray-700/40 to-gray-700/20 rounded-xl">
    <div class="login">
      <BasicButton buttonText="Logowanie" @click="$router.push({ name: 'SignIn' })">
        <Icon icon="fa-solid fa-right-to-bracket" class="my-auto mx-auto"/>
      </BasicButton>
      <BasicButton button-text="Rejestracja" @click="$router.push({ name: 'SignUp' })">
        <Icon icon="fa-solid fa-user-plus" class="my-auto mx-auto"/>
      </BasicButton>
    </div>
    <div class="grid grid-cols-[min-content_1fr] mt-14 mx-auto">
      <Nonogram ref="nonogram" :started="true" class="board-style"/>
      <div class="slogan">
        <p :class="{'!opacity-100': iterator > 0}">Rozwiązuj nonogramy.</p>
        <p :class="{'!opacity-100': iterator > 1}">Wykonuj codzienne wyzwania.</p>
        <p :class="{'!opacity-100': iterator > 2}">Wspinaj się po szczeblach rankingu.</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.slogan {
  @apply
  flex
  flex-col
  gap-5
  text-5xl
    my-auto
    ml-16
  [&>*]:transition-opacity
  italic
  text-wrap
  text-left;
}
.login {
  @apply
  absolute
  grid
  gap-4
  top-4
  right-4
  [&>*]:!bg-gray-600
  max-sm:bottom-0;
}
.board-style{
  @apply
  !static
  !w-fit
  ml-16
  !h-full
  !translate-x-[0]
  !-translate-y-[0]
  place-content-center
  shadow-none

}
p {
  @apply
  opacity-0
}
</style>