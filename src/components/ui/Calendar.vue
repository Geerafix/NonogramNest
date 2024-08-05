<script setup>
import MenuButton from './inputs/MenuButton.vue';
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { set } from '@vueuse/core';
import { getDailies } from '@/services/dailyChallengeService'

const daysNames = ['Pon', 'Wt', 'Śr', 'Czw', 'Pią', 'Sob', 'Nie'];
const monthsNames = [
  'Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'
];
const calendar = reactive({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    firstDay: 0,
    days: 0
});
const streakDays = ref([]);

const prevMonth = () => { 
    calendar.month = (calendar.month === 0) ? 11 : calendar.month - 1;
    if (calendar.month === 11) calendar.year -= 1;
}
const nextMonth = () => { 
    calendar.month = (calendar.month + 1) % 12;
    if (calendar.month === 0) calendar.year += 1;
}

const handleMonthChange = async () => {
    const streak = await getDailies(calendar.month, calendar.year).then((res) =>  res.data);
    set(streakDays, streak)
    calendar.firstDay = (new Date(calendar.year, calendar.month, 1).getDay() + 6) % 7;
    calendar.days = new Date(calendar.year, calendar.month + 1, 0).getDate();
} 

const currentYear = computed(() => 
    calendar.year === new Date().getFullYear() && calendar.month === new Date().getMonth()
);

watch(() => calendar.month, handleMonthChange);

onMounted(handleMonthChange);
</script>

<template>
    <div class="calendar-container">
        <div class="calendar-header">
            <MenuButton class="max-w-1" @click="prevMonth">
                <Icon icon="fa-solid fa-caret-left" class="icon-adjust" />
            </MenuButton>
            <span class="date-info">{{ monthsNames[calendar.month] }} {{ calendar.year }}</span>
            <MenuButton class="max-w-1" @click="nextMonth">
                <Icon icon="fa-solid fa-caret-right" class="icon-adjust" />
            </MenuButton>
        </div>
        <div class="days-container">
            <div v-for="dayName of daysNames" class="day day-name">{{ dayName }}</div>
            <div v-for="day in calendar.firstDay"></div>
            <div v-for="day in calendar.days" :class="['day', {'today': day === new Date().getDate() && currentYear}]">
                <span>{{ day }}</span>
                <Icon v-if="streakDays.includes(day)" class="circle" icon="fa-solid fa-circle" />
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
    mx-auto
    max-w-md
    border-b-[6px]
    bg-gray-600 
    border-gray-800/70
    border-b-gray-800/50
    rounded-xl;
}
.calendar-header {
    @apply 
    flex 
    justify-between 
    gap-6 
    mt-2 
    mx-2;
}
.date-info {
    @apply 
    p-2 
    w-full 
    rounded-xl 
    text-xl 
    text-center;
}
.days-container {
    @apply 
    grid 
    grid-cols-7 
    gap-1
    p-2;
}
.day {
    @apply 
    relative
    min-w-12
    h-12
    p-2
    border-gray-800/40
    hover:bg-gray-800/30
    rounded-xl
    text-xl 
    text-center
    select-none
    cursor-pointer
    max-sm:text-lg;
}
.day-name {
    @apply 
    bg-gray-800/30 
    pointer-events-none
    cursor-auto
    shadow-inner;
}
.today {
    @apply 
    bg-slate-800/50
    border-b-4
    shadow-md;
}
.icon-adjust {
    @apply 
    my-auto 
    mx-auto 
    text-2xl;
}
.circle {
    @apply 
    absolute 
    top-1.5
    right-1.5
    text-teal-500   
    shadow-black
    text-[10px] 
    drop-shadow-md
}
</style>