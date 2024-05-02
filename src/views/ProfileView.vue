<script setup>
import { ref } from 'vue';

const api = ref({});
fetch('http://localhost:3000/users').then(res => res.json()).then(data => api.value = data[1]);

</script>

<template>
    <div class="h-full text-white">
        <div class="w-fit relative mx-auto text-4xl font-thin font-sans">Profil <b>{{ api.username }}</b></div>
    </div>
</template>
