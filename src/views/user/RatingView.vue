<script setup>
import Header from '@/components/ui/Header.vue';
import { getRating } from '@/services/ratingService';
import { ref, onMounted } from 'vue';

const result = ref([]);

onMounted(async () => {
   await getRating().then((res) => result.value = res.data );
});
</script>

<template>
    <main class="view">
        <Header></Header>
        <ol>
            <li v-for="el in result">
                Nazwa: {{ el.User.username }} || Punkty: {{ el.totalPoints }}
            </li>
        </ol>
    </main>
</template>

<style scoped>
.view {
    @apply
    flex
    flex-col
}
ol {
    @apply
    text-xl
    list-inside
    list-decimal
}
</style>

