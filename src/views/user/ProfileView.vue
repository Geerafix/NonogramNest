<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const user = ref({});

const fetchUserData = async () => {
    const res = await axios({ method: 'GET', url: 'http://localhost:3000/users/1' });
    user.value = await res.data[0];
};

onMounted(async () => {
    await fetchUserData();
});
</script>

<template>
    <div class="h-full text-white">
        <div class="w-fit relative mx-auto text-4xl font-thin font-sans">Profil użytkownika <b>{{ user.username }}</b></div>
    </div>
</template>
