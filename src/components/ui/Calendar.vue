<script setup>
import { reactive, onMounted, watch, computed } from 'vue';
import MenuButton from './inputs/MenuButton.vue';

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

const prevMonth = () => { 
    calendar.month = (calendar.month === 0) ? 11 : calendar.month - 1;
    if (calendar.month === 11) calendar.year -= 1;
}
const nextMonth = () => { 
    calendar.month = (calendar.month + 1) % 12;
    if (calendar.month === 0) calendar.year += 1;
}

function handleMonthChange() {
    calendar.firstDay = (new Date(calendar.year, calendar.month, 1).getDay() + 6) % 7;
    calendar.days = new Date(calendar.year, calendar.month + 1, 0).getDate();
} 

const computedDate = computed(() => 
    calendar.year === new Date().getFullYear() && calendar.month === new Date().getMonth()
);

watch(() => calendar.month, () => {
    handleMonthChange();
});

onMounted(() => {
    handleMonthChange();
});
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
            <div v-for="day in calendar.days" 
                :class="['day', {'today': day === new Date().getDate() && computedDate}]">
                <span>{{ day }}</span>
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
    border-b-[6px]
    bg-gray-600 
    border-gray-800/70
    border-b-gray-800/50
    rounded-xl
    transition-all;
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
    min-w-12
    h-12
    p-2
    hover:bg-gray-800/30
    rounded-xl
    cursor-pointer
    text-xl 
    transition-all
    max-sm:text-base
    text-center
    select-none
    border-gray-700/70;
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
    bg-[#8f5333]/90
    border-b-4
    shadow-md;
}
.icon-adjust {
    @apply my-auto mx-auto text-2xl;
}
</style>