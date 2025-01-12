<script setup>
import {computed, watch} from 'vue';

const props = defineProps([
  'limit',
  'page',
  'perpage',
  'prev',
  'next'
]);

const emit = defineEmits([
  'onPageChange'
]);

const handlePrevPage = () => {
  if (computedPrevPage) props.prev();
}

const handleNextPage = () => {
  if (computedNextPage) props.next();
}

const computedPrevPage = computed(() => props.page === 1);
const computedNextPage = computed(() => props.perpage < props.limit);

watch(() => props.page, () => emit('onPageChange'));
</script>

<template>
  <div class="pagination">
    <BasicButton :class="{'opacity-30 pointer-events-none': computedPrevPage}" :disabled="computedPrevPage"
                 @click="handlePrevPage">
      <Icon icon="fa-solid fa-arrow-left"/>
    </BasicButton>
    <Transition mode="out-in" name="slide-left">
      <div :key="page" class="page">{{ page }}</div>
    </Transition>
    <BasicButton :class="{'opacity-30 pointer-events-none': computedNextPage}" :disabled="computedNextPage"
                 @click="handleNextPage">
      <Icon icon="fa-solid fa-arrow-right"/>
    </BasicButton>
  </div>
</template>

<style scoped>
.pagination {
  @apply
  grid
  grid-cols-[min-content_80px_min-content]
  gap-2
  w-fit
  items-center
  absolute
  bottom-0;
}

.page {
  @apply
  w-14
  h-14
  text-2xl
  mx-auto
  text-center
  content-center
  rounded-xl
  select-none
  transition-all;
}
</style>