<script setup>
import BasicButton from '@/components/shared/inputs/BasicButton.vue';
import Header from '@/components/shared/Header.vue';
import Nonogram from '@/components/user/game/Nonogram.vue';
import {onMounted, ref, watch} from 'vue';
import {useInterval} from '@vueuse/core';
import {useNonogram} from '@/composables/useNonogram';

const {counter, resume} = useInterval(1000, {controls: true});

const nonogram = ref(null);
const {setNewBoard, setBoardSize, paintTile, answers} = useNonogram(nonogram);

onMounted(() => {
  setBoardSize(6);
  setNewBoard()
  resume();
});

watch(counter, () => {
  const x = Math.floor(Math.random() * 6);
  const y = Math.floor(Math.random() * 6);
  if (answers.value[y][x] !== -1) {
    paintTile(x, y);
  }
});
</script>

<template>
  <div class="view">
    <Header></Header>
    <div class="flex flex-col gap-4">
      <BasicButton buttonText="Logowanie" class="login" @click="$router.push({ name: 'SignIn' })">
        <Icon icon="fa-solid fa-right-to-bracket" class="my-auto mx-auto"/>
      </BasicButton>
      <div class="slogan">
        <span>Rozwiązuj nonogramy.</span>
        <span>Wykonuj codzienne wyzwania.</span>
        <span>Wspinaj się po szczeblach rankingu.</span>
      </div>
      <Nonogram ref="nonogram" :started="true"/>
    </div>
  </div>
</template>

<style scoped>
.view {
  @apply
  h-full
  text-white
  relative;
}

.home-container {
  @apply
  grid
  grid-cols-[min-content_min-content]
  gap-2
  w-min
  ml-auto
  mt-4;
}

.slogan {
  @apply
  flex
  flex-col
  gap-1.5
  text-2xl
  text-center;
}

.login {
  @apply
  absolute
  right-0
  max-sm:bottom-0;
}
</style>