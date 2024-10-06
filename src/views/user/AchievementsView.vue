<script setup>
import Header from '@/components/shared/Header.vue';
import List from '@/components/shared/list/List.vue';
import Pagination from "@/components/shared/Pagination.vue";
import {getUserAchievements} from '@/services/achievementsService';
import {computed, onMounted, ref, watch} from 'vue';

const achievements = ref([]);
const page = ref(1);
const limit = ref(2);

const settings = computed(() => ({
  limit: limit.value,
  page: page.value,
  perpage: achievements.value.length,
  prev: () => page.value -= 1,
  next: () => page.value += 1
}));

const fetchAchievements = async () => {
    await getUserAchievements(page.value, limit.value).then((res) => achievements.value = res.data );
};

watch(page, fetchAchievements);

onMounted(fetchAchievements);
</script>

<template>
    <main class="view">
        <Header></Header>
        <List class="list"
              :headers="['ID', 'Nazwa', 'Opis', 'Ilość', 'Data']"
              :items="achievements"
        />
        <div class="controls">
          <Pagination v-bind="settings" />
        </div>
    </main>
</template>

<style scoped>
.view {
    @apply
    flex
    flex-col
  relative
}
.controls {
  @apply
  absolute
  flex
  bottom-0
}
</style>
