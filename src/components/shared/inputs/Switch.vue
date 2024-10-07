<script setup>
import { computed, ref, watch } from 'vue';

defineProps(['buttonText']);

const emit = defineEmits(['onSwitch']);

const switched = ref(false);

watch(switched, () => emit('onSwitch', switched.value));

const restyleSwitched = computed(() => (
    switched.value ? 'translate-x-full rounded-se-2xl rounded-ee-2xl border-l-4' : 'rounded-ss-2xl rounded-es-2xl border-r-4')
);
</script>

<template>
    <div class="w-fit relative">
        <button class="switch" @click="switched = !switched">
            <div :class="['dot', restyleSwitched]"></div>
            <slot></slot>
        </button>
    </div>
</template>

<style scoped>
.switch {
    @apply
    grid
    grid-cols-2
    bg-gray-400
    border-gray-500
    border-b-4
    rounded-2xl
    w-24
    h-14
}
.dot {
    @apply
    absolute
    w-1/2
    h-full
    bg-gray-600/85
    border-gray-500
    border-b-4
    transition-all
    drop-shadow-md
    ease-in-out
    duration-[75ms]
}
</style>