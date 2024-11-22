<script setup>
import MenuButton from '@/components/shared/inputs/MenuButton.vue';
import {computed, onBeforeMount, reactive, ref, watch} from 'vue';
import {set} from '@vueuse/core';
import {getDailies} from '@/services/dailyChallengeService.js'

const emit = defineEmits(['onClickedDay']);

const daysNames = ['Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob', 'Nie'];
const monthsNames = [
  'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];
const calendar = reactive({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  firstDay: 0,
  days: 0
});
const streakDays = ref();

const prevMonth = () => {
  calendar.month = (calendar.month === 0) ? 11 : calendar.month - 1;
  if (calendar.month === 11) calendar.year -= 1;
}
const nextMonth = () => {
  calendar.month = (calendar.month + 1) % 12;
  if (calendar.month === 0) calendar.year += 1;
}

const handleMonthChange = async () => {
  const streak = await getDailies(calendar.month, calendar.year).then((res) => res.data);
  set(streakDays, streak);
  calendar.firstDay = (new Date(calendar.year, calendar.month, 1).getDay() + 6) % 7;
  calendar.days = new Date(calendar.year, calendar.month + 1, 0).getDate();
}

const currentYear = computed(() =>
    calendar.year === new Date().getFullYear() && calendar.month === new Date().getMonth()
);

const clickedDay = (day) => {
  emit('onClickedDay', new Date(calendar.year, calendar.month, day));
};

watch(() => calendar.month, handleMonthChange);

onBeforeMount(handleMonthChange);
</script>

<template>
  <Transition name="fetch-fade" mode="out-in">
    <div class="calendar-container" v-if="streakDays">
      <div class="calendar-header">
        <MenuButton class="max-w-1" @click="prevMonth">
          <Icon icon="fa-solid fa-caret-left" class="icon-adjust"/>
        </MenuButton>
        <div class="date-info">
          <Transition name="fade" mode="out-in">
            <span :key="calendar.month">{{ monthsNames[calendar.month] }} {{ calendar.year }}</span>
          </Transition>
        </div>
        <MenuButton class="max-w-1" @click="nextMonth">
          <Icon icon="fa-solid fa-caret-right" class="icon-adjust"/>
        </MenuButton>
      </div>
      <div class="days-name-container">
        <div v-for="dayName of daysNames" class="day-name">{{ dayName }}</div>
      </div>
      <div class="days-container">
        <div v-for="day in calendar.firstDay"></div>
        <div v-for="day in calendar.days" :class="['day', {'today': day === new Date().getDate() && currentYear}]" @click="clickedDay(day)">
          <span>{{ day }}</span>
          <div v-if="streakDays.includes(day)" class="indicator"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.calendar-container {
  @apply
  flex
  flex-col
  w-3/4
  mx-auto
  mt-2
  max-w-md
  border-b-4
  bg-gray-600
  border-b-gray-800/50
  rounded-xl;
}

.calendar-header {
  @apply
  grid
  grid-cols-[auto_1fr_auto]
  rounded-ss-xl
  rounded-se-xl
  bg-gray-500/25
  gap-2
  p-2;
}

.date-info {
  @apply
  w-full
  h-full
  rounded-xl
  bg-gray-700/50
  text-2xl
  text-center
  shadow-inner
  content-center;
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
  relative
  min-w-12
  h-14
  content-center
  rounded-lg
  border-gray-800/40
  bg-gray-800/15
  hover:bg-gray-800/30
  text-gray-200
  text-xl
  text-center
  select-none
  cursor-pointer
  max-sm:text-lg;
}

.days-name-container {
  @apply
  grid
  grid-cols-7
  p-3
  px-2
  gap-1
  bg-gray-700
  text-xl
  shadow-inner;
}

.day-name {
  @apply
  pointer-events-none
  cursor-auto
  text-center
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

.indicator {
  @apply
  absolute
  -top-0.5
  -left-0.5
  w-5
  h-5
  bg-teal-600/20
  border-teal-500/55
  border-t-4
  border-l-4
  rounded-sm
  rounded-ss-xl
  rounded-ee-2xl
  filter
  drop-shadow-md;
}
</style>