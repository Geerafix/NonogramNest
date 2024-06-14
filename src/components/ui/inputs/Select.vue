<script setup>
import { ref } from 'vue';

defineProps([
    'items'
]);
const emit = defineEmits([
    'select'
]);

const plc = [
    { name: '6 x 6', value: 6 },
    { name: '8 x 8', value: 8 },
    { name: '10 x 10', value: 10 },
    { name: '12 x 12', value: 12 },
    { name: '14 x 14', value: 14 }
]

const selected = ref('Rozmiar');
const expanded = ref(false);

const selectOption = (item) => {
    selected.value = item.name;
    expanded.value = !expanded.value;
    emit('select', item.value);
};
</script>

<template>
    <div class="select-container relative">
        <Transition appear name="fade" mode="out-in">
            <ul v-if="expanded">
                <li v-for="item in plc" @click="selectOption(item)">
                    {{ item.name }}
                </li>
            </ul>
        </Transition>
        <div class="select" @click="expanded = !expanded">
            <span class="my-auto">{{ selected }}</span>
            <Icon icon="fa-solid fa-chevron-up" :class="['my-auto', 'mx-auto', 'text-base', 'transition-all', { '-rotate-180': expanded }]" />
        </div>
    </div>
</template>

<style>
.select-container {
    @apply flex flex-col;
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
    bg-cyan-700 
    border-slate-800/60
    ring-cyan-800/90
    hover:rounded-[20px]
    border-b-4
    text-xl
    transition-all
    outline-none
    cursor-pointer;
}
ul {
    @apply 
    flex 
    flex-col 
    rounded-2xl 
    absolute 
    bottom-16 
    gap-2 
    bg-cyan-700
    border-b-4
    border-slate-800/60;
}
li {
    @apply 
    w-[120px] 
    p-2 
    text-center 
    text-xl 
    hover:bg-cyan-900/50 
    transition-all 
    rounded-xl 
    cursor-pointer;
}
</style>