<script setup>
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import BasicInput from "@/components/shared/inputs/BasicInput.vue";
import Select from "@/components/shared/inputs/Select.vue";
import {sizes} from "@/config.js";
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

const setSize = (size) => emit('newBoard', size);
</script>

<template>
  <Transition name="slide-down-no-leave" class="flex gap-2">
    <div>
      <Transition name=slide-right>
        <BasicInput v-model="name" placeholder="Nazwa..." v-show="isCreating"/>
      </Transition>
      <BasicButton @click="emit('clearBoard')">
        <Icon icon="fa-solid fa-rotate"/>
      </BasicButton>
      <BasicButton @click="submitNonogram">
        <Icon icon="fa-solid fa-check"/>
      </BasicButton>
      <Select :items="sizes" @onSelect="setSize" />
    </div>
  </Transition>
</template>