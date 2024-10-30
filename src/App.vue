<script setup>
import Menu from '@/components/shared/menu/Menu.vue';
import MenuUserItems from '@/components/shared/menu/MenuUserItems.vue';
import MenuAdminItems from '@/components/shared/menu/MenuAdminItems.vue';
import {useRoute} from 'vue-router';
import {computed, onMounted, ref, provide} from 'vue';

const route = useRoute();
const user = computed(() => route.meta.pageOwner === 'user');
const admin = computed(() => route.meta.pageOwner === 'admin');

const notification = ref();
onMounted(() => {
  provide('show', notification.value.show);
});
</script>

<template>
  <main class="app-container">
    <Transition name="fade" mode="out-in">
      <Menu v-if="user || admin" v-slot="{ Component }">
        <component :is="admin ? MenuAdminItems : (user ? MenuUserItems : Component)"/>
      </Menu>
    </Transition>
    <RouterView class="router-container" v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component"/>
      </Transition>
    </RouterView>
    <Notification ref="notification"/>
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