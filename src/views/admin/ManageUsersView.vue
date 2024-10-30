<script setup>
import Pagination from '@/components/shared/Pagination.vue';
import List from '@/components/shared/list/List.vue';
import Switch from "@/components/shared/inputs/Switch.vue";
import Select from "@/components/shared/inputs/Select.vue";
import ManageUser from "@/components/admin/management/ManageUser.vue";
import {getUsers, getAdmins, getUser} from '@/services/adminService';
import {computed, onMounted, ref, watch} from 'vue';
import {set} from '@vueuse/core';
import {useList} from '@/composables/useList';
import {usePagination} from '@/composables/usePagination';
import {useBlurOnView} from "@/composables/useBlurOnView.js";
import {useNotification} from "@/composables/useNotification.js";
import {usersSearchBy} from "@/config.js";

const search = ref('');
const option = ref('name');
const who = ref(false);
const managedUser = ref(null);
const users = ref([]);
const rolledSearch = ref(false);

const listState = useList(['UID','Email','Nazwa użytkownika','Rola'], users);
const {pageState, pageReset} = usePagination(1, 10, users);

const {blurred} = useBlurOnView(managedUser, false);

const notification = ref();
const {notify} = useNotification(notification);

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

const onAccept = (status, message) => {
  set(managedUser, null);
  fetchUsers(who.value);
  notify(status, message);
}

const setOption = (opt) => set(option, opt);

watch([search, option], () => {
  pageReset();
  fetchUsers(who.value);
});

const slideHideSelect = computed(() =>
    (who.value ? 'max-w-0 -mr-2 opacity-0' : 'max-w-36').concat(' transition-all')
);

onMounted(fetchUsers);
</script>

<template>
  <main>
    <Header></Header>
    <List :class="['list', blurred]" v-bind="listState" @onListItemClick="manageUser"/>
    <Pagination v-bind="pageState" @onPageChange="fetchUsers(who)"/>
    <Transition name="slide-left-hidden">
      <BasicButton v-if="!rolledSearch" @click="rolledSearch = !rolledSearch" class="absolute right-0 bottom-0">
        <Icon icon="fa-solid fa-search" class="icon-fix"/>
      </BasicButton>
    </Transition>
    <Transition name="slide-left-hidden">
      <div class="search-container" v-if="rolledSearch">
        <BasicButton @click="rolledSearch = false">
          <Icon icon="fa-solid fa-eye-slash" class="icon-fix"/>
        </BasicButton>
        <BasicInput v-model="search" placeholder="Wyszukaj..." />
        <Select :class="[slideHideSelect]" :items="usersSearchBy" @onSelect="setOption"/>
        <Switch @onSwitch="fetchUsers">
          <Icon icon="fa-solid fa-user" class="icon-fix"/>
          <Icon icon="fa-solid fa-user-secret" class="icon-fix"/>
        </Switch>
      </div>
    </Transition>
    <Transition name="fade">
      <ManageUser v-if="managedUser" :user="managedUser" @accept="onAccept" @reject="managedUser = null"/>
    </Transition>
    <Notification ref="notification" />
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
  text-2xl;
}
</style>