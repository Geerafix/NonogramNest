<script setup>
import Header from '@/components/ui/Header.vue';
import BasicButton from '@/components/ui/inputs/BasicButton.vue';
import UserProfile from '@/components/user/profile/UserProfile.vue';
import { onBeforeMount, ref } from 'vue';
import { getUserProfile } from '@/services/userService';

const user = ref({});

onBeforeMount(async () => {
    await getUserProfile().then((res) => user.value = res.data );
});
</script>

<template>
    <main class="view">
        <Header></Header>
        <UserProfile :user="user" class="place-self-center"></UserProfile>
        <BasicButton @click="deleteUser()" class="w-fit">Usuń konto</BasicButton>
    </main>
</template>

<style scoped>
.view {
    @apply
    flex 
    flex-col
}
</style>
