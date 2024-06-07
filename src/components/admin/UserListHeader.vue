<script setup>
defineProps([ 'attributeName' ]);
</script>

<template>
    <div class="grid bg-gray-600 rounded-md text-center w-full h-11">
        <span class="self-center text-xl select-none">{{ attributeName }}</span>
    </div>
</template>