<script setup>
import { ref, onMounted } from 'vue';

const days = ref([]);
const daysNames = ['Pon', 'Wt', 'Śr', 'Czw', 'Pią', 'Sob', 'Nie'];
const numberOfDays = ref(0);
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;

onMounted(() => {
    numberOfDays.value = new Date(year, month, 0).getDate();
});
</script>

<template>
    <div class="calendar-container">
        <div class="flex justify-between gap-6 mt-2 mx-2">
            <button class="day day-name">
                <Icon icon="fa-solid fa-arrow-left" class="my-auto mx-auto" />
            </button>
            <span class="text-xl rounded-xl p-2 w-full text-center">Czerwiec 2024</span>
            <button class="day day-name">
                <Icon icon="fa-solid fa-arrow-right" class="my-auto mx-auto" />
            </button>
        </div>
        <div class="days-container">
            <div v-for="dayName of daysNames" class="day day-name">{{ dayName }}</div>
            <div v-for="(day, index) of numberOfDays" :class="['day', {'today': day === new Date().getDate()}]">
                <span>{{ index + 1 }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.calendar-container {
    @apply
    flex
    flex-col
    w-full
    max-w-md
    bg-gray-600 
    border-b-[6px]
    border-[3px]
    border-gray-800/70
    border-b-gray-800/50
    rounded-xl
    transition-all;
}
.days-container {
    @apply 
    grid 
    grid-cols-7 
    gap-1
    p-2
}
.day {
    @apply 
    min-w-12
    h-12
    p-2
    hover:bg-gray-800/30
    rounded-xl
    transition-all
    cursor-pointer
    text-xl 
    max-sm:text-base
    text-center
    select-none
    border-gray-700/70;
}
.day-name {
    @apply 
    bg-gray-800/40 
    shadow-inner 
    pointer-events-none 
    cursor-auto;
}
.today {
    @apply bg-orange-600/30 border-b-4 ;
}
</style>