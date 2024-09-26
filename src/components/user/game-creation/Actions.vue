<script setup>
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import Select from "@/components/shared/inputs/Select.vue";
import { sizes } from "@/store";
const emit = defineEmits([
  'newBoard',
  'clearBoard',
  'submit'
]);

const setSize = (size) => {
    emit('newBoard', size);
};

</script>

<template>
  <Transition name="slide-down-no-leave">
    <div class="flex gap-2">
        <BasicButton @click="emit('clearBoard')" :style="{ backgroundColor: 'teal' }">
            <Icon icon="fa-solid fa-rotate" />
        </BasicButton>
        <BasicButton @click="emit('submit')" :style="{ backgroundColor: '#8f5333' }">
            <Icon icon="fa-solid fa-check" />
        </BasicButton>
        <Select :items="sizes" @select="setSize"></Select>
    </div>
  </Transition>
</template>