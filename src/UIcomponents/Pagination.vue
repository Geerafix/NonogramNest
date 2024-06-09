<script setup>
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue';
import { computed } from 'vue';
const props = defineProps([
    'limit',
    'page',
    'perpage',
    'prev',
    'next'
]);

const prevHandle = () => {
  if (computedPrevPage) {
    props.prev();
  }
}

const nextHandle = () => {
  if (computedNextPage) {
    props.next();
  }
}

const computedPrevPage = computed(() => {
  return props.page === 1;
});

const computedNextPage = computed(() => {
  return props.perpage < props.limit;
});

</script>

<template>
    <div class="pagination">
        <BasicButton @click="prevHandle" :style="{ opacity: computedPrevPage ? 0.3 : 1 }" :disabled="computedPrevPage">
            <Icon icon="fa-solid fa-arrow-left" class="my-auto mx-auto" />
        </BasicButton>
        <span class="text-2xl mx-auto">{{ page }}</span>
        <BasicButton @click="nextHandle" :style="{ opacity: computedNextPage ? 0.3 : 1 }" :disabled="computedNextPage">
            <Icon icon="fa-solid fa-arrow-right" class="my-auto mx-auto"/>
        </BasicButton>
    </div>
</template>

<style scoped>
.pagination {
    @apply grid grid-cols-[min-content_80px_min-content] gap-2 items-center absolute bottom-0 left-0 right-0 mx-auto w-fit
}
</style>