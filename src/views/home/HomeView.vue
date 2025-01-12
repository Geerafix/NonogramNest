<script setup>
import Nonogram from '@/components/user/game/Nonogram.vue';
import {sloganTexts} from "@/config.js";
import {onMounted, ref, watch} from 'vue';
import {useInterval} from '@vueuse/core';
import {useNonogram} from '@/composables/useNonogram';

const {counter, resume} = useInterval(750, {controls: true});

const nonogram = ref(null);
const {setNewBoard, setBoardSize, paintAnswer, paintExclude} = useNonogram(nonogram);

const size = 12;

watch(counter, () => {
  const x = Math.floor(Math.random() * size);
  const y = Math.floor(Math.random() * size);
  (counter.value % 4 === 0 ? paintExclude : paintAnswer)(x, y);
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
        <Icon class="my-auto ml-1" icon="fa-solid fa-right-to-bracket"/>
      </BasicButton>
      <BasicButton button-text="Rejestracja" @click="$router.push({ name: 'SignUp' })">
        <Icon class="my-auto ml-1" icon="fa-solid fa-user-plus"/>
      </BasicButton>
    </div>
    <div class="grid grid-cols-[min-content_1fr] mt-14">
      <Nonogram ref="nonogram" :started="true" class="board-style"/>
      <div class="slogan">
        <p v-for="(el, idx) in sloganTexts" :class="[{'!opacity-100': counter > idx}, 'slogan-element']">
          <Icon :class="[el.color, 'icon-style']" :icon="['fa-solid', `fa-${el.icon}`]"/>
          <span class="bg-gradient-to-r from-gray-700/70 rounded-xl px-4 py-2">{{ el.text }}</span>
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.slogan {
  @apply
  grid
  gap-5
  text-[2.25rem]
  my-auto
  ml-14
  [&>*]:transition-all
  [&>*]:w-fit
  select-none
  italic
  z-0
  text-gray-100
  text-wrap
  text-left;
}

.slogan-element {
  @apply
  grid
  grid-cols-[auto_1fr]
  gap-4
}

.icon-style {
  @apply
  w-10
  my-auto
  px-3
  h-full
  bg-gradient-to-l
  from-gray-700/70
  rounded-xl
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

.board-style {
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