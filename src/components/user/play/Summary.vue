<script setup>
import { ref } from 'vue';
import { set, onClickOutside } from '@vueuse/core'
import BasicButton from '@/components/ui/inputs/BasicButton.vue';

const target = ref(null)
const isDisplayed = ref(false);
const points = ref(null);

const display = (data) => { 
    set(points, data);
    set(isDisplayed, true); 
};
const hide = () => { 
    set(isDisplayed, false); 
};

onClickOutside(target, event => hide());

defineExpose({
    isDisplayed,
    display,
    hide
});
</script>

<template>
    <Transition name="fade">
        <div ref="target" class="summary" v-if="isDisplayed">
            <div class="info">
                <span>Twoje rozwiązanie jest poprawne.</span><br>
                <span>Gratulacje!</span>
            </div>
            <div class="score">
                <span>Podsumowanie:</span>
                <span><b>{{ points }}</b> pkt.</span>
            </div>
            <div class="buttons">
                <BasicButton @click="hide()"> Potwierdź
                    <Icon icon="fa-solid fa-check" />
                </BasicButton>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.summary {
    @apply
    absolute
    top-1/2
    left-1/2
    -translate-x-1/2 
    -translate-y-1/2
    grid
    min-h-14
    px-4
    p-2
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
.info {
    @apply 
    pb-2 
    border-b-2
    border-gray-700;
}
.score {
    @apply 
    grid 
    gap-1 
    p-2 
    mb-2
    border-b-2 
    border-gray-700;
}
</style>