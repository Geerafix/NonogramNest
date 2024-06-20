<script setup>
import BasicButton from "@/components/ui/inputs/BasicButton.vue";
import Select from "@/components/ui/inputs/Select.vue";
import { ref, watch } from "vue";
import { set } from '@vueuse/core'
const emit = defineEmits([
  'newGame',
  'check',
  'size',
  'pause',
  'endGame'
]);
const props = defineProps([
    'started',
]);

const isPaused = ref(false);
const isSelected = ref(false);

const handlePause = () => {
  isPaused.value = !isPaused.value;
  emit('pause');
};

const handleCheck = () => {
  emit('check');
};

const handleNewGame = () => {
  emit('newGame'); 
};

const handleEndGame = () => {
  setSize(isSelected, false);
  emit('endGame');
};
 
const setSize = (data) => {
  set(isSelected, true);
  emit('size', data);
};

watch(() => props.started, (started) => {
  if (started === false) set(isSelected, false); 
});
</script>

<template>
  <div>
      <div v-if="!props.started" class="flex gap-2">
        <BasicButton @click="handleNewGame()" :class="{'opacity-50': !isSelected}" :disabled="!isSelected">
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