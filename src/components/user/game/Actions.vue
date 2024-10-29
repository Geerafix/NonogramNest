<script setup>
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import Select from "@/components/shared/inputs/Select.vue";
import {sizes} from "@/config.js";
import {onMounted, ref, watch} from "vue";
import {set} from '@vueuse/core'

const emit = defineEmits([
  'newGame',
  'check',
  'size',
  'pause',
  'endGame'
]);

const props = defineProps([
  'started',
  'paused'
]);

const isSelected = ref(false);

const handleEndGame = () => {
  setSize(isSelected, false);
  emit('endGame');
};

const setSize = (data) => {
  set(isSelected, true);
  emit('size', data);
  if (!data) {
    set(isSelected, false);
  }
};

watch(() => props.started, (started) => {
  if (started === false) set(isSelected, false);
});
</script>

<template>
  <TransitionGroup name="slide-down-no-leave">
    <div v-if="!props.started" class="flex gap-2">
      <BasicButton @click="emit('newGame')" :class="{'opacity-50': !isSelected}" :disabled="!isSelected">
        <Icon icon="fa-solid fa-gamepad"/>
      </BasicButton>
      <Select :items="sizes" @onSelect="setSize"></Select>
    </div>
    <div v-else class="flex gap-2">
      <BasicButton @click="handleEndGame">
        <Icon icon="fa-solid fa-xmark"/>
      </BasicButton>
      <BasicButton @click="emit('pause')" :class="{ 'animate-pulse': paused }"
                   :style="{ backgroundColor: paused ? 'rgb(6 95 70)' : '#7C2C3B' }">
        <Icon v-if="paused" icon="fa-solid fa-play"/>
        <Icon v-else icon="fa-solid fa-stop"/>
      </BasicButton>
      <BasicButton @click="emit('check')" :disabled="paused"
                   :style="{ backgroundColor: 'rgb(17 94 89)', opacity: paused ? 0.5 : 1 }">
        <Icon icon="fa-solid fa-check"/>
      </BasicButton>
    </div>
  </TransitionGroup>
</template>