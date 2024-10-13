<script setup>
import {ref} from 'vue';
import {onClickOutside, set} from '@vueuse/core'
import BasicButton from '@/components/shared/inputs/BasicButton.vue';

const isDisplayed = ref(false);
const target = ref(null)
const points = ref(null);
const bonus = ref(null);

const show = (p, b) => {
  set(points, p);
  set(bonus, b);
  set(isDisplayed, true);
};

const hide = () => {
  set(points, null);
  set(bonus, null);
  set(isDisplayed, false);
};

onClickOutside(target, event => hide());

defineExpose({isDisplayed, show, hide});
</script>

<template>
  <Transition name="fade">
    <div ref="target" class="summary" v-if="isDisplayed">
      <div class="info">
        <span>Twoje rozwiązanie jest poprawne.</span>
        <span>Gratulacje!</span>
      </div>
      <div class="score">
        <div class="flex justify-between">
          <span>Punkty bazowe:</span>
          <span><b>{{points}}</b></span>
        </div>
        <div class="flex justify-between pb-4">
          <span>Bonus:</span>
          <span><b>{{bonus}}</b></span>
        </div>
        <div class="text-right border-gray-600 border-t-2 pt-4">
          <span>Razem: </span>
          <span><b>{{points + bonus}}</b> pkt.</span>
        </div>
      </div>
      <BasicButton @click="hide()">Potwierdź
        <Icon icon="fa-solid fa-check"/>
      </BasicButton>
    </div>
  </Transition>
</template>

<style scoped>
.summary {
  @apply
  absolute
  flex
  flex-col
  items-center
  top-1/2
  left-1/2
  -translate-x-1/2
  -translate-y-1/2
  gap-4
  min-h-14
  py-2
  px-4
  border-b-4
  bg-gray-600
  border-gray-800/60
  text-slate-200
  rounded-xl
  font-thin
  font-sans
  text-2xl
  text-wrap
  text-center
  tracking-wide
  select-none
  z-10
  max-sm:w-full;
}

.info {
  @apply
  flex
  flex-col
  gap-2;
}

.score {
  @apply
  flex
  flex-col
  w-full
  gap-1
  p-4
  rounded-xl
  bg-gray-700
}
</style>