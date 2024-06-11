<script setup>
import Pagination from '@/UIcomponents/Pagination.vue';
import UserItem from '@/components/admin/users/UserItem.vue';
import UserListItem from '@/components/admin/users/UserListItem.vue';
import ListHeader from '@/components/admin/ListHeader.vue';
import { getUsers } from '@/services/adminService';
import Header from '@/UIcomponents/Header.vue';
import {ref, watch, onMounted, computed} from 'vue';

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
    await getUsers(page.value, limit.value)
        .then((res) => { users.value = res.data })
        .then((err) => {  });
};

watch(page, fetchUsers);

onMounted(fetchUsers);
</script>

<template>
    <div class="h-full text-white relative">
        <Header>Użytkownicy</Header>
        <div class="overflow-auto max-h-[calc(100%-9rem)] pr-2">
            <div class="header">
                <ul v-for="header of ['Id','Nazwa użytkownika','Email','Rola']">
                  <li>
                    <ListHeader :headerName="header" />
                  </li>
                </ul>
            </div>
            <ul v-for="(user, idx) in users" class="list" :class="{ 'mb-2': idx < users.length - 1 }">
                <li>
                  <UserListItem>
                    <div v-for="value in user">
                      <UserItem :value="value" />
                    </div>
                  </UserListItem>
                </li>
            </ul>
        </div>
        <Pagination v-bind="settings" />
    </div>
</template>

<style scoped>
.header {
  @apply mb-2 p-2 gap-2 bg-gray-900/40 grid grid-cols-[1fr_30%_30%_1fr] sticky top-0 rounded-lg z-10;
}
.list {
  @apply p-2 bg-gray-900/40 rounded-lg mx-auto h-full list-none;
}
</style>