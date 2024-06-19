<script setup>
import BasicButton from "@/components/ui/inputs/BasicButton.vue";
import Select from "@/components/ui/inputs/Select.vue";
import { ref } from "vue";
const emit = defineEmits([
  'newGame',
  'size',
  'check',
  'pause',
  'endGame'
]);
const props = defineProps([
    'started',
]);

const size = ref(0);
const isPaused = ref(false);
const controlsVisible = ref(false);

const handlePause = () => {
  emit('pause');
  isPaused.value = !isPaused.value;
};

const handleCheck = () => {
  emit('check');
};

const handleNewGame = () => {
  if(props.size !== 0) {
    controlsVisible.value = true;
    emit('newGame'); 
  }
};

const handleEndGame = () => {
  size.value = 0;
  controlsVisible.value = false;
  emit('endGame');
};
 
const setSize = (data) => {
  size.value = data;
  emit('size', data);
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
      <div v-else class="flex gap-2">
      <BasicButton @click="handleEndGame">
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
  </div>
</template>