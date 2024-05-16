<script setup>
import Menu from '@/UIcomponents/menu/Menu.vue';
import MenuUserItems from '@/UIcomponents/menu/MenuUserItems.vue';
import MenuAdminItems from '@/UIcomponents/menu/MenuAdminItems.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const computedUser = computed(() => { return route.meta.pageOwner === 'user'; });
const computedAdmin = computed(() => { return route.meta.pageOwner === 'admin'; });
</script>

<template>
  <main class="p-4 h-[inherit] grid gap-4 font-thin font-sans"
    :class="{ 'grid-cols-[min-content_auto]': computedUser || computedAdmin }">
    <Menu v-if="computedUser || computedAdmin" :width="computedUser ? 175 : 190" v-slot="{ Component }">
      <component :is="computedAdmin ? MenuAdminItems : (computedUser ? MenuUserItems : Component)" />
    </Menu>
    <RouterView class="z-100 h-full w-full" />
  </main>
</template>