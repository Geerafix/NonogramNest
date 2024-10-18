<script setup>
import Pagination from '@/components/shared/Pagination.vue';
import Header from '@/components/shared/Header.vue';
import List from '@/components/shared/list/List.vue';
import Switch from "@/components/shared/inputs/Switch.vue";
import {getUsers, getAdmins, getUser} from '@/services/adminService';
import {computed, onMounted, ref, watch} from 'vue';
import {set} from '@vueuse/core';
import {useList} from '@/composables/useList';
import {usePagination} from '@/composables/usePagination';
import {usersSearchBy} from "@/config.js";
import Select from "@/components/shared/inputs/Select.vue";
import BasicInput from "@/components/shared/inputs/BasicInput.vue";
import {useBlurOnView} from "@/composables/useBlurOnView.js";

const search = ref('');
const option = ref('name');
const who = ref(false);
const managedUser = ref(null);
const users = ref([]);

const listState = useList(['Id','Email','Nazwa użytkownika','Rola'], users);
const {pageState, pageReset} = usePagination(1, 10, users);

const {blurred} = useBlurOnView(managedUser);

const fetchUsers = async (switched) => {
  set(who, switched);
  if (who.value) {
    await getAdmins(search.value, option.value, pageState.value.page, pageState.value.limit).then((res) =>
        set(users, res.data));
  } else {
    await getUsers(search.value, option.value, pageState.value.page, pageState.value.limit, search.value).then((res) =>
        set(users, res.data));
  }
};

const manageUser = async (user) => {
  await getUser(user.user_id).then((res) => set(managedUser, res.data));

};

const setOption = (opt) => set(option, opt);

watch([search, option], () => {
  pageReset();
  fetchUsers(who.value);
});

onMounted(fetchUsers);
</script>

<template>
  <main>
    <Header></Header>
    <List :class="['list', blurred]" v-bind="listState" @onListItemClick="manageUser"/>
    <Pagination v-bind="pageState" @onPageChange="fetchUsers(who)"/>
    <div class="search-container">
      <BasicInput v-model="search" placeholder="Wyszukaj..." />
      <Select :items="usersSearchBy" @onSelect="setOption"/>
      <Switch @onSwitch="fetchUsers">
        <Icon icon="fa-solid fa-user" class="icon-fix"/>
        <Icon icon="fa-solid fa-user-secret" class="icon-fix"/>
      </Switch>
    </div>
  </main>
</template>

<style scoped>
.search-container {
  @apply
  flex
  gap-2
  absolute
  bottom-0
  right-0;
}
.icon-fix {
  @apply
  my-auto
  mx-auto
  text-2xl
  text-gray-600
}
</style>