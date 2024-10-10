<script setup>
import Header from '@/components/shared/Header.vue';
import UserProfile from '@/components/user/profile/UserProfile.vue';
import {onBeforeMount, ref} from 'vue';
import {getUserProfile} from '@/services/userService';
import BasicButton from "@/components/shared/inputs/BasicButton.vue";

const user = ref({});

onBeforeMount(async () => {
  await getUserProfile().then((res) => user.value = res.data);
});
</script>

<template>
  <main>
    <Header></Header>
    <div class="grid gap-2 m-auto w-fit">
      <UserProfile :user="user" class="mb-2"></UserProfile>
      <div class="grid grid-cols-4 w-fit gap-2">
        <BasicButton>Zmień nazwę</BasicButton>
        <BasicButton>Zmień hasło</BasicButton>
        <BasicButton>Zmień Email</BasicButton>
        <BasicButton :style="{'backgroundColor': '#7C2C3B'}">Usuń konto</BasicButton>
      </div>
      <BasicButton class="w-1/2">Wiadomość do administracji</BasicButton>
    </div>
  </main>
</template>
