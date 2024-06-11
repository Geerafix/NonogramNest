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
  <main class="flex sm:gap-4 p-4 h-[inherit] font-thin font-sans">
    <Transition name="fade" mode="out-in">
      <Menu class="basis-auto" v-if="computedUser || computedAdmin" :width="computedUser ? 185 : 190" v-slot="{ Component }">
        <component :is="computedAdmin ? MenuAdminItems : (computedUser ? MenuUserItems : Component)" />
      </Menu>
    </Transition>
    <RouterView class="h-full w-full z-100" v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component"/>
      </Transition>
    </RouterView>
  </main>
</template>