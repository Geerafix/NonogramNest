<script setup>
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import BasicInput from "@/components/shared/inputs/BasicInput.vue";
import Select from "@/components/shared/inputs/Select.vue";
import {sizes} from "@/store";
import { set } from "@vueuse/core";
import {ref} from "vue";

defineProps([
  'isCreating'
]);

const emit = defineEmits([
  'newBoard',
  'clearBoard',
  'submit'
]);

const name = ref('');

const submitNonogram = () => {
  emit('submit', name.value);
  set(name, '');
};

const setSize = (size) => {
  emit('newBoard', size);
};

</script>

<template>
  <Transition name="slide-down-no-leave">
    <div class="flex gap-2">
      <Transition name=fade>
        <BasicInput v-model="name" placeholder="Nazwa..." v-show="isCreating"/>
      </Transition>
      <BasicButton @click="emit('clearBoard')" :style="{ backgroundColor: 'teal' }">
        <Icon icon="fa-solid fa-rotate"/>
      </BasicButton>
      <BasicButton @click="submitNonogram" :style="{ backgroundColor: '#8f5333' }">
        <Icon icon="fa-solid fa-check"/>
      </BasicButton>
      <Select :items="sizes" @select="setSize"></Select>
    </div>
  </Transition>
</template>