<script setup>
import Pagination from '@/components/shared/Pagination.vue';
import Header from '@/components/shared/Header.vue';
import List from '@/components/shared/list/List.vue';
import {getUsers} from '@/services/adminService';
import {onMounted, ref} from 'vue';
import {set} from '@vueuse/core';
import {useList} from '@/composables/useList';
import {usePagination} from '@/composables/usePagination';

const users = ref([]);
const listState = useList(['Id','Email','Nazwa','Rola'], users);

const {pageState} = usePagination(1, 10, users);

const fetchUsers = async () => {
  await getUsers(pageState.value.page, pageState.value.limit).then((res) => set(users, res.data));
};

const manageUser = (user) => {

};

onMounted(fetchUsers);
</script>

<template>
  <main class="flex flex-col">
    <Header></Header>
    <List class="list" v-bind="listState" @onListItemClick="manageUser"/>
    <Pagination v-bind="pageState" @onPageChange="fetchUsers"/>
  </main>
</template>

<style scoped>

</style>