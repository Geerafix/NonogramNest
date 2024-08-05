<script setup>
import BasicButton from '@/components/ui/inputs/BasicButton.vue';
import { computed } from 'vue';
const props = defineProps([
    'limit',
    'page',
    'perpage',
    'prev',
    'next'
]);

const handlePrevPage = () => {
  if (computedPrevPage) {
    props.prev();
  }
}

const handleNextPage = () => {
  if (computedNextPage) {
    props.next();
  }
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
        <span class="text-2xl mx-auto">{{ page }}</span>
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
  mt-4 
  mx-auto
  items-center;
}
</style>