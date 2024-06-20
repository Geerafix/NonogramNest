<script setup>
import { ref } from 'vue';
import { set, useTimeout } from '@vueuse/core'
import BasicButton from './inputs/BasicButton.vue';
const props = defineProps([
    'msg',
    'time'
]);
const emit = defineEmits([
    'confirm'
]);
const isDisplayed = ref(false);

const display = () => {
    set(isDisplayed, true);
};

const hide = (result) => {
    emit('confirm', result);
    set(isDisplayed, false);
};

</script>

<template>
    <Transition name="slide-left">
        <div class="confirm-popup" v-if="isDisplayed">
            Czy na pewno chcesz to zrobić?
            <div class="buttons">
                <BasicButton @click="hide(true)">
                    <Icon icon="fa-solid fa-check" />
                </BasicButton>
                <BasicButton @click="hide(false)">
                    <Icon icon="fa-solid fa-xmark" />
                </BasicButton>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.confirm-popup {
    @apply 
    grid
    gap-4
    absolute
    right-0 
    min-h-14
    max-w-96
    px-4
    py-[8px] 
    border-b-4 
    rounded-xl
    bg-gray-600
    border-gray-800/60
    text-slate-200   
    select-none
    font-thin
    font-sans
    text-2xl
    text-wrap
    text-center
    tracking-wide
    max-sm:w-full
    z-10;
}
.buttons {
    @apply flex gap-4 m-auto;
}
</style>