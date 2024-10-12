<script setup>
import Header from '@/components/shared/Header.vue';
import List from "@/components/shared/list/List.vue";
import {useList} from "@/composables/useList.js";
import {onMounted, ref} from "vue";
import {getMessages} from "@/services/adminService.js";
import {set} from "@vueuse/core";

const messages = ref([]);
const listState = useList(['Tytuł','Opis','Data','Użytkownik'], messages, [0]);

const fetchMessages = async () => {
  await getMessages(1, 10).then((res) => set(messages, res.data));
};

onMounted(fetchMessages);
</script>

<template>
  <main>
    <Header></Header>
    <List v-bind="listState"></List>
  </main>
</template>