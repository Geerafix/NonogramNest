<script setup>
import Menu from '@/components/shared/menu/Menu.vue';
import MenuUserItems from '@/components/shared/menu/MenuUserItems.vue';
import MenuAdminItems from '@/components/shared/menu/MenuAdminItems.vue';
import {useRoute} from 'vue-router';
import {computed, onMounted, provide, ref} from 'vue';

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
    <Transition mode="out-in" name="fade">
      <Menu v-if="user || admin" v-slot="{ Component }">
        <component :is="admin ? MenuAdminItems : (user ? MenuUserItems : Component)"/>
      </Menu>
    </Transition>
    <RouterView v-slot="{ Component }" class="router-container">
      <Transition mode="out-in" name="fade">
        <div :key="Component" class="view">
          <Header/>
          <component :is="Component"/>
        </div>
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

.view {
  @apply
  grid
  grid-rows-[auto_1fr]
  w-full
}
</style>