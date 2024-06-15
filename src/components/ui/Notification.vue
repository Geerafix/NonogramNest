<script setup>
import { onBeforeMount } from 'vue';
import { useTimeout } from '@vueuse/core'
const props = defineProps([
    'msg',
    'status',
    'time']);
const { ready, start, stop } = useTimeout(props.time, {controls: true})
defineExpose({
    start
});
onBeforeMount(stop);
</script>

<template>
    <Transition name="slide-left">
        <div v-if="!ready" :class="['notification', props.status ? 'bg-teal-900' : 'bg-[#7C2C3B]']">
            {{ props.msg }}
        </div>
    </Transition>
</template>

<style scoped>
.notification {
    @apply 
    absolute
    right-0 
    min-h-14
    max-w-96
    px-4
    py-[8px] 
    border-b-4 
    rounded-xl
    border-slate-800/60
    text-slate-200   
    select-none
    font-thin
    font-sans
    text-2xl
    text-wrap
    tracking-wide
    max-sm:w-full;
}
</style>