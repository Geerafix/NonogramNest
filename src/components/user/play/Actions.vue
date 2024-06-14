<script setup>
import BasicButton from "@/components/ui/inputs/BasicButton.vue";
import Select from "@/components/ui/inputs/Select.vue";
import { ref } from "vue";
const emit = defineEmits(['handleNewGame'])
const props = defineProps([
    'length',
    'pause',
    'check'
]);

const isPaused = ref(false);
const controlsVisible = ref(false);

const handlePause = () => {
  props.pause();
  isPaused.value = !isPaused.value;
};

const handleCheck = () => {
  props.check();
};

const handleNewGame = () => {
  controlsVisible.value = true;
  emit('handleNewGame'); 
};
</script>

<template>
  <div>
    <div v-if="controlsVisible === false" class="flex gap-2">
      <BasicButton  @click="handleNewGame()">
        <Icon icon="fa-solid fa-plus" class="my-auto mx-auto" />
      </BasicButton>
      <Select></Select>
    </div>
    <TransitionGroup name="slide-up">
      <div v-if="controlsVisible === true" class="flex gap-2">
      <BasicButton>
        <Icon icon="fa-solid fa-xmark" class="my-auto mx-auto scale-125" />
      </BasicButton>
      <BasicButton @click="handlePause" :class="{ 'animate-pulse': isPaused }"
                  :style="{ backgroundColor: isPaused ? '#3C6961' : '#7C2C3B' }">
        <Icon v-if="!isPaused" icon="fa-solid fa-stop" class="my-auto mx-auto" />
        <Icon v-else icon="fa-solid fa-play" class="my-auto mx-auto" />
      </BasicButton>
      <BasicButton @click="handleCheck" :style="{ backgroundColor: '#8f5333', opacity: isPaused ? 0.5 : 1 }" 
                  :disabled="isPaused">
        <Icon icon="fa-solid fa-check" class="my-auto mx-auto" />
      </BasicButton>
    </div>
    </TransitionGroup>
  </div>
</template>