<script setup>
import { ref } from 'vue';
import { set } from '@vueuse/core';
defineProps(['items']);
const emit = defineEmits(['select']);

const plc = [
    { name: '15 x 15', value: 15 },
    { name: '14 x 14', value: 14 },
    { name: '13 x 13', value: 13 },
    { name: '12 x 12', value: 12 },
    { name: '11 x 11', value: 11 },
    { name: '10 x 10', value: 10 },
    { name: '9 x 9', value: 9 },
    { name: '8 x 8', value: 8 },
    { name: '7 x 7', value: 7 },
    { name: '6 x 6', value: 6 },
    { name: '5 x 5', value: 5 }
]

const selected = ref('Rozmiar');
const expanded = ref(false);

const selectOption = (item) => {
    set(selected, item.name);
    set(expanded, false);
    emit('select', item.value);
};
</script>

<template>
    <Transition name="fade">
        <div class="select-container">
            <Transition name="fade" mode="out-in">
                <ul v-if="expanded">
                    <li v-for="item in plc" @click="selectOption(item)">
                        {{ item.name }}
                    </li>
                </ul>
            </Transition>
            <div class="select" @click="expanded = !expanded">
                <span class="my-auto">{{ selected }}</span>
                <Icon icon="fa-solid fa-chevron-up" :class="['icon', { '-rotate-180': expanded }]" />
            </div>
        </div>
    </Transition>
</template>

<style>
.select-container {
    @apply 
    flex 
    flex-col
    relative;
}
.select {
    @apply 
    grid
    grid-cols-[1fr_auto]
    justify-between 
    px-3
    rounded-xl 
    min-h-14
    min-w-[120px]
    bg-cyan-800 
    border-slate-800/60
    ring-cyan-800/90
    hover:rounded-[20px]
    border-b-4
    text-xl
    transition-all
    outline-none
    cursor-pointer;
}
.icon {
    @apply 
    my-auto 
    mx-auto 
    text-base 
    transition-all;
}
ul {
    @apply 
    flex 
    flex-col 
    rounded-2xl 
    absolute 
    bottom-16 
    gap-2 
    bg-cyan-800
    border-b-4
    border-slate-800/60;
}
li {
    @apply 
    w-[120px] 
    px-2
    py-1.5 
    text-center 
    text-xl 
    hover:bg-cyan-900/50 
    transition-all 
    shadow-black
    hover:shadow-inner
    rounded-xl 
    cursor-pointer;
}
</style>