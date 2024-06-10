<script setup>
import BasicButton from "@/UIcomponents/inputs/BasicButton.vue";
import { check } from "@/scripts/puzzleScript";
import { ref } from "vue";
const props = defineProps([
    'pause',
    'check'
]);

const isPaused = ref(false);

const handlePause = () => {
  props.pause();
  isPaused.value = !isPaused.value;
};

const handleCheck = () => {
  props.check();
};

</script>

<template>
  <div class="flex w-fit gap-2">
    <BasicButton class="grid grid-cols-[1fr_auto] w-14" @click="handlePause"
                :style="{ backgroundColor: isPaused ? '#3C6961' : '#7C2C3B' }">
      <Icon v-if="!isPaused" icon="fa-solid fa-stop" class="my-auto mx-auto" />
      <Icon v-else icon="fa-solid fa-play" class="my-auto mx-auto" />
    </BasicButton>
    <BasicButton class="grid grid-cols-[1fr_auto] w-14" @click="handleCheck"
                :style="{ backgroundColor: '#8f5333' }">
      <Icon icon="fa-solid fa-check" class="my-auto mx-auto" />
    </BasicButton>
  </div>
</template>