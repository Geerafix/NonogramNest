<script setup>
import BasicButton from "@/components/ui/inputs/BasicButton.vue";
import Select from "@/components/ui/inputs/Select.vue";
import { sizes } from "@/store";
const emit = defineEmits([
  'newBoard'
]);

const setSize = (size) => {
    emit('newBoard', size);
};

</script>

<template>
  <Transition name="slide-down-no-leave">
    <div class="flex gap-2">
        <BasicButton :style="{ backgroundColor: '#5548a1' }">
            <Icon icon="fa-solid fa-rotate" />
        </BasicButton>
        <BasicButton :style="{ backgroundColor: 'rgb(40 78 70)' }">
            <Icon icon="fa-solid fa-check" />
        </BasicButton>
        <Select :items="sizes" @select="setSize"></Select>
    </div>
  </Transition>
</template>