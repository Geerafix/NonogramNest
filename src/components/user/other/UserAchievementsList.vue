<script setup>
import TrailingBox from "@/components/shared/TrailingBox.vue";
import {useTrailingBox} from "@/composables/useTrailingBox.js";

defineProps(['achievements']);

const {showBox, hideBox, message, isHovered} = useTrailingBox();

const date = (date_achieved) => (
    date_achieved ? new Date(date_achieved).toLocaleDateString().concat(' r.') : 'Nieosiągnięto'
);
</script>

<template>
  <div class="container">
    <li v-for="achievement in achievements">
      <div :class="['item', {'opacity-50': !achievement.date_achieved}]">
        <div class="name-date">
          <div class="item-row" @mouseenter="showBox('Nazwa')" @mouseleave="hideBox">
            {{achievement.name}}
          </div>
          <div class="item-row" @mouseenter="showBox('Data osiągnięcia')" @mouseleave="hideBox">
            {{date(achievement.date_achieved)}}
          </div>
        </div>
        <div class="item-row" @mouseenter="showBox('Opis')" @mouseleave="hideBox">
          {{achievement.description}}
        </div>
      </div>
    </li>
  </div>
  <TrailingBox :message="message" :isHovered="isHovered" />
</template>

<style scoped>
.container {
  @apply
  grid
  gap-2
  w-full
  list-none
  text-xl
  transition-all
}
.name-date {
  @apply
  grid
  gap-2
  [&>*]:!bg-gray-700
  [&>*]:!p-3.5
}
.item {
  @apply
  p-2
  grid
  gap-2
  grid-cols-2
  rounded-xl
  bg-gray-900/40
}
.item-row {
  @apply
  bg-gray-700/40
  p-2.5
  rounded-lg
  w-full
  hover:brightness-[115%]
  transition-all
  text-wrap
}
</style>