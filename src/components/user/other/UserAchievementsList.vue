<script setup>
import TrailingBox from "@/components/shared/TrailingBox.vue";
import {useTrailingBox} from "@/composables/useTrailingBox.js";

defineProps(['achievements']);

const {showBox, hideBox, message, isHovered} = useTrailingBox();

const date = (date_achieved) => (
    date_achieved ? (new Date(date_achieved).toLocaleDateString()).concat(' r.') : 'Nieosiągnięto'
);
</script>

<template>
  <Transition mode="out-in" name="fade-slower">
    <div :key="achievements" class="container">
      <li v-for="achievement in achievements">
        <div :class="['item', {'opacity-30': !achievement.date_achieved}]">
          <div class="grid grid-cols-[1fr_25%] gap-2">
            <div class="item-row bg-gradient-to-r from-gray-700"
                 @mouseenter="showBox('Nazwa')" @mouseleave="hideBox">
              {{ achievement.name }}
            </div>
            <div class="date-achieved bg-gradient-to-l"
                 @mouseenter="showBox('Data osiągnięcia')" @mouseleave="hideBox">
              {{ date(achievement.date_achieved) }}
            </div>
          </div>
          <div class="item-row bg-gradient-to-l from-gray-700/25" @mouseenter="showBox('Opis')" @mouseleave="hideBox">
            {{ achievement.description }}
          </div>
        </div>
      </li>
    </div>
  </Transition>
  <TrailingBox :isHovered="isHovered" :message="message"/>
</template>

<style scoped>
.container {
  @apply
  grid
  grid-cols-2
  gap-4
  h-fit
  columns-2
  list-none
  text-xl
  transition-all
  max-h-[calc(100vh-10.4rem)]
  max-w-full
  overflow-auto;
}

.item {
  @apply
  p-2
  grid gap-2
  rounded-xl
  select-none
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

.date-achieved {
  @apply
  item-row
  content-center
  text-center
  bg-gradient-to-b
}

</style>