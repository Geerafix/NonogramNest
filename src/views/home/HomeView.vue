<script setup>
import BasicButton from '@/UIcomponents/BasicButton.vue';

</script>

<template>
    <div class="h-full text-white">
        <div class="w-fit relative mx-auto text-4xl font-thin font-sans">Strona główna</div>
        <div class="grid grid-cols-[min-content_min-content] gap-2">
            <BasicButton btnText="Logowanie" @click="$router.push('/logowanie')"/>
            <BasicButton btnText="Rejestracja" @click="$router.push('/rejestracja')"/>
        </div>
    </div>
</template>
