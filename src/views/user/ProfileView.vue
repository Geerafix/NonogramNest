<script setup>
import { onMounted, ref } from 'vue';

const user = ref({});

onMounted(async () => {

});
</script>

<template>
    <div class="h-full text-white">
        <div class="w-fit relative mx-auto text-4xl font-thin font-sans">Profil użytkownika <b>{{ user.username }}</b>
        </div>
    </div>
</template>
