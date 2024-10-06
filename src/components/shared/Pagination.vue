<script setup>
import BasicButton from '@/components/shared/inputs/BasicButton.vue';
import { computed, onMounted, ref } from 'vue';
const props = defineProps([
    'limit',
    'page',
    'perpage',
    'prev',
    'next'
]);

const handlePrevPage = () => {
  if (computedPrevPage) props.prev();
}

const handleNextPage = () => {
  if (computedNextPage) props.next();
}

const computedPrevPage = computed(() => props.page === 1 );
const computedNextPage = computed(() => props.perpage < props.limit );
</script>

<template>
    <div class="pagination">
        <BasicButton @click="handlePrevPage" :disabled="computedPrevPage"
          :class="{'opacity-30': computedPrevPage}" >
          <Icon icon="fa-solid fa-arrow-left" />
        </BasicButton>
        <div class="page">{{ page }}</div>
        <BasicButton @click="handleNextPage" :disabled="computedNextPage"
          :class="{'opacity-30': computedNextPage}" >
          <Icon icon="fa-solid fa-arrow-right" />
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
  items-center;
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