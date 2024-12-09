<script setup>
import Pagination from '@/components/shared/Pagination.vue';
import List from '@/components/shared/list/List.vue';
import Switch from "@/components/shared/inputs/Switch.vue";
import Select from "@/components/shared/inputs/Select.vue";
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import ManageUserPartial from "@/views/admin/ManageUserPartial.vue";
import {getUsers, getAdmins, getUser} from '@/services/adminService';
import {onMounted, ref, watch} from 'vue';
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

const listState = useList(['ID użytkownika','E-mail użytkownika','Nazwa użytkownika','Rola'], users);
const {pageState, pageReset} = usePagination(1, users);

const {blurred} = useBlurOnView(managedUser, false);

const {notify} = useNotification();

const fetchUsers = async (switched) => {
  set(who, switched);
  const {page, limit} = pageState.value;
  if (who.value) {
    await getAdmins(search.value, option.value, page, limit).then((res) =>
        set(users, res.data));
  } else {
    await getUsers(search.value, option.value, page, limit, search.value).then((res) =>
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

onMounted(fetchUsers);
</script>

<template>
  <main>
    <List :class="[blurred]" v-bind="listState" @onListItemClick="manageUser"/>
    <Transition name="fade" mode="out-in">
      <Pagination v-if="!managedUser" v-bind="pageState" @onPageChange="fetchUsers(who)"/>
    </Transition>
    <Transition name="slide-left-hidden" class="absolute right-0 bottom-0">
      <BasicButton v-if="!rolledSearch && !managedUser" @click="rolledSearch = !rolledSearch">
        <Icon icon="fa-solid fa-search" class="icon-fix"/>
      </BasicButton>
    </Transition>
    <Transition name="slide-left-hidden" mode="out-in">
      <div class="search-container" v-if="rolledSearch && !managedUser">
        <BasicButton @click="rolledSearch = false">
          <Icon icon="fa-solid fa-eye-slash" class="icon-fix"/>
        </BasicButton>
        <BasicInput v-model="search" placeholder="Wyszukaj..." />
        <Select :items="usersSearchBy" @onSelect="setOption"/>
        <Switch v-if="false" @onSwitch="fetchUsers" :displayed="who ? 'Admini' : 'Użytkownicy'">
          <Icon icon="fa-solid fa-user" class="icon-fix"/>
          <Icon icon="fa-solid fa-user-secret" class="icon-fix"/>
        </Switch>
      </div>
    </Transition>
    <ManageUserPartial v-if="managedUser" :managedUser="managedUser" @accept="onAccept" @reject="() => managedUser = null"/>
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
.viewed-user {
  @apply
  absolute
  left-0
  right-0
  mx-auto
  top-1/2
  -translate-y-1/2
}
</style>