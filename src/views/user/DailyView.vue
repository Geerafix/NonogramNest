<script setup>
import Header from '@/components/ui/Header.vue';
import Calendar from '@/components/ui/Calendar.vue';
import BasicButton from '@/components/ui/inputs/BasicButton.vue';
import { ref } from 'vue';
import Notification from '@/components/ui/Notification.vue';

const notification = ref(null);
const settings = {
    msg: 'Wykonano zadanie. Wróć jutro.',
    status: true,
    time: 2000
};
</script>

<template>
    <main class="relative">
        <Header></Header>
        <div class="flex flex-col justify-between w-fit gap-8 mx-auto">
            <Calendar></Calendar>
            <BasicButton class="w-fit mx-auto" @click="notification.start()">Wykonaj</BasicButton>
            <Notification ref="notification" v-bind="settings"></Notification>
        </div>
    </main>
</template>
