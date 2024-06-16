<script setup>
import BasicButton from "@/components/ui/inputs/BasicButton.vue";
import Select from "@/components/ui/inputs/Select.vue";
import { ref } from "vue";
const emit = defineEmits([
  'handleNewGame',
  'handleSize'
]);
const props = defineProps([
    'length',
    'pause',
    'check',
    'size'
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
  if(props.size !== 0) {
    controlsVisible.value = true;
    emit('handleNewGame'); 
  }
};

const setSize = (size) => {
  emit('handleSize', size);
};
</script>

<template>
  <div>
    <div v-if="!controlsVisible" class="flex gap-2">
      <BasicButton @click="handleNewGame()" :class="{'opacity-50': size === 0}" :disabled="size === 0">
        <Icon icon="fa-solid fa-plus" />
      </BasicButton>
      <Select @select="setSize"></Select>
    </div>
    <TransitionGroup name="slide-up">
      <div v-if="controlsVisible" class="flex gap-2">
      <BasicButton>
        <Icon icon="fa-solid fa-xmark" />
      </BasicButton>
      <BasicButton @click="handlePause" :class="{ 'animate-pulse': isPaused }"
        :style="{ backgroundColor: isPaused ? '#3C6961' : '#7C2C3B' }">
        <Icon v-if="isPaused" icon="fa-solid fa-play" />
        <Icon v-else icon="fa-solid fa-stop" />
      </BasicButton>
      <BasicButton @click="handleCheck" :disabled="isPaused"
        :style="{ backgroundColor: '#8f5333', opacity: isPaused ? 0.5 : 1 }">
        <Icon icon="fa-solid fa-check" />
      </BasicButton>
    </div>
    </TransitionGroup>
  </div>
</template>