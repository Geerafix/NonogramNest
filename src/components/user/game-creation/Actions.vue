<script setup>
import Select from "@/components/shared/inputs/Select.vue";
import {sizes} from "@/config.js";
import {set} from "@vueuse/core";
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
  <Transition class="flex gap-2" name="slide-down-no-leave">
    <div>
      <Transition name="slide-right">
        <div v-show="isCreating" class="flex gap-2">
          <BasicInput v-model="name" placeholder="Nazwa..."/>
          <BasicButton @click="emit('clearBoard')">
            <Icon icon="fa-solid fa-rotate"/>
          </BasicButton>
          <BasicButton @click="submitNonogram">
            <Icon icon="fa-solid fa-check"/>
          </BasicButton>
        </div>
      </Transition>
      <Select :items="sizes" @onSelect="setSize"/>
    </div>
  </Transition>
</template>