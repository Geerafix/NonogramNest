<script setup>
import Nonogram from '@/components/user/game/Nonogram.vue';
import {onMounted, ref, watch} from 'vue';
import {useInterval} from '@vueuse/core';
import {useNonogram} from '@/composables/useNonogram';

const {counter, resume} = useInterval(750, {controls: true});

const nonogram = ref(null);
const {setNewBoard, setBoardSize, paintAnswer, answers} = useNonogram(nonogram);

const size = 10;

watch(counter, () => {
  const x = Math.floor(Math.random() * size);
  const y = Math.floor(Math.random() * size);
  if (answers.value[y][x] !== -1 &&  counter.value % 1 === 0) {
    paintAnswer(x, y);
  }
});

onMounted(() => {
  setBoardSize(size);
  setNewBoard()
  resume();
});
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
        <p :class="{'!opacity-100': counter > 0}">
          <Icon icon="fa-solid fa-chess-board" class="text-zinc-200"/>&nbsp; Rozwiązuj nonogramy.
        </p>
        <p :class="{'!opacity-100': counter > 1}">
          <Icon icon="fa-solid fa-star" class="text-yellow-100"/>&nbsp; Zdobywaj osiągnięcia.
        </p>
        <p :class="{'!opacity-100': counter > 2}">
          <Icon icon="fa-solid fa-trophy" class="text-orange-100"/>&nbsp; Wykonuj codzienne wyzwania.
        </p>
        <p :class="{'!opacity-100': counter > 3}">
          <Icon icon="fa-solid fa-chart-simple" class="text-red-100"/>&nbsp; Wspinaj się po szczeblach rankingu.
        </p>
        <p :class="{'!opacity-100': counter > 4}">
          <Icon icon="fa-solid fa-user-check" class="text-green-100"/>&nbsp; Zarejestruj się już dziś!
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.slogan {
  @apply
  grid
  gap-8
  text-[2.5rem]
  my-auto
  ml-16
  [&>*]:transition-all
  [&>*]:w-fit
  select-none
  italic
  text-gray-100
  text-wrap
  z-0
  text-left;
}
.login {
  @apply
  absolute
  grid
  gap-4
  top-4
  p-4
  right-4
  place-content-end
  [&>*]:!bg-slate-600
  [&>*]:!w-fit
  from-slate-800/50
  bg-gradient-to-l
  rounded-xl
  z-50
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