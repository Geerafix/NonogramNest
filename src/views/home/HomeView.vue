<script setup>
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue';
import Header from '@/UIcomponents/Header.vue';
</script>

<template>
    <div class="h-full text-white">
        <Header>Strona główna</Header>
        <div class="grid grid-cols-[min-content_min-content] gap-2 w-min ml-auto mt-4">
            <BasicButton btnText="Logowanie" @click="$router.push({ name: 'SignIn' })">
              <Icon icon="fa-solid fa-right-to-bracket" class="my-auto mx-auto" />
            </BasicButton>
        </div>
    </div>
</template>
