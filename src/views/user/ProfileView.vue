<script setup>
import { onMounted, ref } from 'vue';

const user = ref({});

onMounted(async () => {

});
</script>

<template>
    <div class="h-full text-white">
        <div class="w-fit mx-auto font-thin font-sans text-4xl">Profil użytkownika <b>{{ user.username }}</b>
        </div>
    </div>
</template>
