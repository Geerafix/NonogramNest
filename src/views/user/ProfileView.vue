<script setup>
import Header from '@/components/shared/Header.vue';
import UserProfile from '@/components/user/profile/UserProfile.vue';
import {onBeforeMount, ref} from 'vue';
import {getUserProfile} from '@/services/userService';

const user = ref({});

onBeforeMount(async () => {
  await getUserProfile().then((res) => user.value = res.data);
});
</script>

<template>
  <main>
    <Header></Header>
    <UserProfile :user="user" class="m-auto"></UserProfile>
  </main>
</template>
