<script setup>
import ListHeader from './ListHeader.vue'
import ListItem from './ListItem.vue';
import Header from "./Header.vue";
import Item from './Item.vue';

const props = defineProps([
  'headers',
  'items',
  'excluded'
]);

const emit = defineEmits([
  'onListItemClick'
]);

const onListItemClick = (item) => {
  emit('onListItemClick', item);
};

const filteredItem = (item) => (
    Object.fromEntries(Object.entries(item).filter((key, idx) => !props.excluded?.includes(idx)))
);
</script>

<template>
  <div v-if="props.items" class="container">
    <div v-if="headers" class="headers">
      <ListHeader>
        <li v-for="header in props.headers">
          <Header :headerName="header"/>
        </li>
      </ListHeader>
    </div>
    <Transition name="fade-slower" mode="out-in">
      <div class="items" :key="props.items">
        <li v-for="item in props.items">
          <ListItem @click="onListItemClick(item)">
            <li v-for="value of filteredItem(item)">
              <Item :value="value" class="truncate ..."/>
            </li>
          </ListItem>
        </li>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.container {
  @apply
  relative
  max-h-[calc(100vh-10.4rem)]
  max-w-full
  overflow-auto
}
.headers {
  @apply
  sticky
  top-0
  transition-all
  z-50
  list-none;
}
.items {
  @apply
  list-none
  grid
  gap-2;
}
</style>