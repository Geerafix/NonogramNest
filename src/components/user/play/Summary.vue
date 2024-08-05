<script setup>
import { ref } from 'vue';
import { set, onClickOutside } from '@vueuse/core'
import BasicButton from '@/components/ui/inputs/BasicButton.vue';

const isDisplayed = ref(false);
const target = ref(null)
const points = ref(null);

const show = (data) => { 
    set(points, data);
    set(isDisplayed, true); 
};

const hide = () => { 
    set(points, 0);
    set(isDisplayed, false); 
};

onClickOutside(target, event => hide());

defineExpose({ isDisplayed, show, hide });
</script>

<template>
    <Transition name="fade">
        <div ref="target" class="summary" v-if="isDisplayed">
            <div class="info">
                <span>Twoje rozwiązanie jest poprawne.</span>
                <span>Gratulacje!</span>
            </div>
            <div class="score">
                <span>Podsumowanie:</span>
                <span><b>{{ points }}</b> pkt.</span>
            </div>
            <BasicButton @click="hide()">Potwierdź
                <Icon icon="fa-solid fa-check" />
            </BasicButton>
        </div>
    </Transition>
</template>

<style scoped>
.summary {
    @apply
    absolute
    flex
    flex-col
    items-center
    top-1/2
    left-1/2
    -translate-x-1/2 
    -translate-y-1/2
    gap-4
    min-h-14
    py-2
    px-4
    bg-gray-600
    border-gray-800/60
    text-slate-200   
    rounded-xl
    font-thin
    font-sans
    text-2xl
    text-wrap
    text-center
    tracking-wide
    select-none
    z-10
    max-sm:w-full;
}
.info {
    @apply
    flex
    flex-col
    gap-2;
}
.score {
    @apply 
    flex
    flex-col
    w-full
    gap-1 
    py-4 
    border-t-2 
    border-b-2 
    border-gray-700;
}
</style>