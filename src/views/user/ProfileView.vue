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
  <main class="view">
    <Header></Header>
    <UserProfile :user="user" class="place-self-center"></UserProfile>
  </main>
</template>

<style scoped>
.view {
  @apply
  flex
  flex-col
}
</style>
