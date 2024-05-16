<script setup>
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue';
</script>

<template>
    <div class="h-full text-white">
        <div class="w-fit mx-auto font-thin font-sans text-4xl">Strona główna</div>
        <div class="grid grid-cols-[min-content_min-content] gap-2 w-min ml-auto">
            <BasicButton btnText="Logowanie" @click="$router.push({ name: 'SignIn' })"/>
            <BasicButton btnText="Rejestracja" @click="$router.push({ name: 'SignUp' })"/>
        </div>
    </div>
</template>
