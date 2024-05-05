<script setup>
import Menu from './UIcomponents/menu/Menu.vue';
import MenuUserItems from './UIcomponents/menu/MenuUserItems.vue';
import MenuAdminItems from './UIcomponents/menu/MenuAdminItems.vue';

</script>

<template>
  <main class="p-4 h-[inherit] grid gap-4"
        :class="{ 'grid-cols-[80px_auto]': $route.meta.pageOwner === 'user' || $route.meta.pageOwner === 'admin' }">
    <Menu :width="$route.meta.pageOwner === 'user' ? 175 : 190" v-if="!$route.meta.hideMenu">
      <MenuUserItems v-if="$route.meta.pageOwner === 'user'"/>
      <MenuAdminItems v-else/>
    </Menu>
    <RouterView class="z-100 h-full w-full"/>  
  </main>
</template>