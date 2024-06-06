<script setup>
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue';
const props = defineProps([
    'limit',
    'page',
    'items'
]);

const previousPage = () => { props.page > 1 ? props.page -= 1 : props.page };
const nextPage = () => { props.items.length < props.limit ? props.page : props.page += 1 };

</script>

<template>
    <div class="grid grid-cols-[min-content_80px_min-content] gap-2 items-center absolute bottom-0 left-0 right-0 mx-auto w-fit">
        <BasicButton @click="previousPage"><Icon icon="fa-solid fa-arrow-left" class="my-auto mx-auto"/></BasicButton>
        <span class="text-2xl mx-auto">{{ page }}</span>
        <BasicButton @click="nextPage"><Icon icon="fa-solid fa-arrow-right" class="my-auto mx-auto"/></BasicButton>
    </div>
</template>