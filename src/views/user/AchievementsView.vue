<script setup>
import Header from '@/components/shared/Header.vue';
import List from '@/components/shared/list/List.vue';
import { getUserAchievements } from '@/services/achievementsService';
import { onMounted, ref } from 'vue';

const achievements = ref([]);

const fetchAchievements = async () => {
    await getUserAchievements().then((res) => achievements.value = res.data );
};

onMounted(fetchAchievements);
</script>

<template>
    <main class="view">
        <Header></Header>
        <List class="list" :headers="['ID', 'Nazwa', 'Opis', 'Ilość', 'Data']" :items="achievements"></List>
    </main>
</template>

<style scoped>
.view {
    @apply
    flex
    flex-col
}
</style>
