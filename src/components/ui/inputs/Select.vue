<script setup>
defineProps([
    'items'
]);

</script>

<template>
    <select>
        <option disabled selected>Rozmiar</option>
        <option value="1">6x6</option>
        <option value="2">8x8</option>
        <option value="3">10x10</option>
        <option value="4">12x12</option>
        <option value="5">14x14</option>
    </select>
</template>

<style>
select {
    @apply 
    px-3
    rounded-xl 
    min-w-[120px]
    bg-cyan-700 
    border-slate-800/60
    ring-cyan-800/90
    focus:ring-2
    focus:rounded-[20px]
    hover:rounded-[20px]
    border-b-4
    text-xl
    transition-all
    outline-none
    cursor-pointer;
}
option {
    @apply font-thin text-white;
}
</style>