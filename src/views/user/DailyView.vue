<script setup>
import Header from '@/components/ui/Header.vue';
import Calendar from '@/components/ui/Calendar.vue';
import BasicButton from '@/components/ui/inputs/BasicButton.vue';
</script>

<template>
    <main>
        <Header>Codzienne wyzwanie</Header>
        <div class="grid w-fit gap-4 mx-auto">
            <Calendar></Calendar>
            <BasicButton class="w-fit mx-auto">Wykonaj</BasicButton>
        </div>
    </main>
</template>
