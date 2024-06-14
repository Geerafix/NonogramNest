<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import MenuButton from './inputs/MenuButton.vue';

const daysNames = ['Pon', 'Wt', 'Śr', 'Czw', 'Pią', 'Sob', 'Nie'];

const days = ref([]);
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth());
const firstDay = ref(0);

const prevMonth = () => { 
    if (month.value === 0) {
        month.value = 11;
        year.value -= 1;
    } else {
        month.value -= 1;
    }
}
const nextMonth = () => { 
    if (month.value === 11) {
        month.value = 0;
        year.value += 1;
    } else {
        month.value += 1;
    }
}

function handleMonth() {
    let numberOfDays = new Date(year.value, month.value + 1, 0).getDate();
    firstDay.value = (new Date(year.value, month.value, 1).getDay() + 6) % 7;
    days.value = Array.from(Array(numberOfDays), (_, idx) => idx + 1);
} 

const computedDate = computed(() => { 
    return year.value === new Date().getFullYear() && month.value === new Date().getMonth();
});

watch(month,() => {
    handleMonth();
});

onMounted(() => {
    handleMonth();
});
</script>

<template>
    <div class="calendar-container">
        <div class="flex justify-between gap-6 mt-2 mx-2">
            <MenuButton class="max-w-1" @click="prevMonth">
                <Icon icon="fa-solid fa-arrow-left" class="my-auto mx-auto" />
            </MenuButton>
            <span class="text-xl rounded-xl p-2 w-full text-center">{{ month + 1 }}. {{ year }}</span>
            <MenuButton class="max-w-1" @click="nextMonth">
                <Icon icon="fa-solid fa-arrow-right" class="my-auto mx-auto" />
            </MenuButton>
        </div>
        <div class="days-container">
            <div v-for="dayName of daysNames" class="day day-name">{{ dayName }}</div>
            <div class="day" v-for="idx in firstDay"></div>
            <div v-for="day of days" 
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
    bg-orange-600/30 
    border-b-4
    shadow-md;
}
</style>