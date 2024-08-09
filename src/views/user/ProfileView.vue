<script setup>
import Header from '@/components/ui/Header.vue';
import { onBeforeMount, ref } from 'vue';
import { getUserProfile } from '@/services/userService';
import List from '@/components/ui/list/List.vue';

const user = ref({});

onBeforeMount(async () => {
    await getUserProfile().then((res) => user.value = res.data );
});
</script>

<template>
    <main class="view">
        <Header></Header>
        <List :items="Array.from([ user ])" :headers="['UID', 'Bio', 'Rozwiązanych', 'Punktów razem', 'Łączny czas gry', 'Data rejestracji']"></List>
    </main>
</template>

<style scoped>
.view {
    @apply
    flex 
    flex-col
}
</style>
