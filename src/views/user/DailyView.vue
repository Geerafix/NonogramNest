<script setup>
import Header from '@/components/ui/Header.vue';
import Calendar from '@/components/ui/Calendar.vue';
import BasicButton from '@/components/ui/inputs/BasicButton.vue';
</script>

<template>
    <main>
        <Header></Header>
        <div class="flex flex-col justify-between w-fit gap-8 mx-auto">
            <Calendar></Calendar>
            <BasicButton class="w-fit mx-auto">Wykonaj</BasicButton>
            <span class="mx-auto text-xl">Wykonano dzisiejsze wyzwanie. Wróć jutro</span>
        </div>
    </main>
</template>
