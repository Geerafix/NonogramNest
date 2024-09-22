<script setup>
import Menu from '@/components/shared/menu/Menu.vue';
import MenuUserItems from '@/components/shared/menu/MenuUserItems.vue';
import MenuAdminItems from '@/components/shared/menu/MenuAdminItems.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const computedUser = computed(() => { return route.meta.pageOwner === 'user'; });
const computedAdmin = computed(() => { return route.meta.pageOwner === 'admin'; });
</script>

<template>
  <main class="app-container">
    <Transition name="fade" mode="out-in">
      <Menu v-if="computedUser || computedAdmin" v-slot="{ Component }">
        <component :is="computedAdmin ? MenuAdminItems : (computedUser ? MenuUserItems : Component)" />
      </Menu>
    </Transition>
    <RouterView class="router-container" v-slot="{ Component }">
      <Transition name="fade" mode="out-in" >
        <component :is="Component"/>
      </Transition>
    </RouterView>
  </main>
</template>

<style scoped>
.app-container {
  @apply
  flex 
  p-4 
  h-[inherit] 
  font-thin 
  font-sans 
  text-white
  sm:gap-4;
}
.router-container {
  @apply
  h-full 
  w-full 
  z-auto;
}
</style>