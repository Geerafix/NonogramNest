<script setup>
import Menu from '@/components/ui/menu/Menu.vue';
import MenuUserItems from '@/components/ui/menu/MenuUserItems.vue';
import MenuAdminItems from '@/components/ui/menu/MenuAdminItems.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const computedUser = computed(() => { return route.meta.pageOwner === 'user'; });
const computedAdmin = computed(() => { return route.meta.pageOwner === 'admin'; });
</script>

<template>
  <main class="flex sm:gap-4 p-4 h-[inherit] font-thin font-sans text-white">
    <Transition name="fade" mode="out-in">
      <Menu v-if="computedUser || computedAdmin" v-slot="{ Component }">
        <component :is="computedAdmin ? MenuAdminItems : (computedUser ? MenuUserItems : Component)" />
      </Menu>
    </Transition>
    <RouterView class="h-full w-full z-100" v-slot="{ Component }">
      <Transition name="fade" mode="out-in" >
        <component class="" :is="Component"/>
      </Transition>
    </RouterView>
  </main>
</template>