<script setup>
import Pagination from '@/components/ui/Pagination.vue';
import Header from '@/components/ui/Header.vue';
import List from '@/components/ui/list/List.vue';
import { getUsers } from '@/services/adminService';
import { ref, watch, onMounted, computed } from 'vue';

const page = ref(1);
const limit = ref(10);
const users = ref([]);

const settings = computed(() => ({
  limit: limit.value,
  page: page.value,
  perpage: users.value.length,
  prev: () => page.value -= 1,
  next: () => page.value += 1
}));

const fetchUsers = async () => {
    await getUsers(page.value, limit.value).then((res) => { users.value = res.data });
};

watch(page, fetchUsers);

onMounted(fetchUsers);
</script>

<template>
    <main class="flex flex-col">
      <Header></Header>
      <List class="list" :headers="['Id','Nazwa użytkownika','Email','Rola']" :items="users" />
      <Pagination v-bind="settings" />
    </main>
</template>

<style scoped>
.view {
  @apply
  flex 
  flex-col
}
.list {
  @apply 
  h-full 
  pr-2
  overflow-auto; 
}
</style>