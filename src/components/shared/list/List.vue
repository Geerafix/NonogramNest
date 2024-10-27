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

const shortenedValue = (val) => (
    val && val.length > 15 ? val.slice(0, 15).concat('...') : val
);

const filteredItem = (item) => (
    Object.fromEntries(Object.entries(item).filter((key, idx) => !props.excluded?.includes(idx)))
);
</script>

<template>
  <div v-if="props.items" class="transition-all">
    <div v-if="headers" class="headers">
      <ListHeader>
        <li v-for="header in props.headers">
          <Header :headerName="header"/>
        </li>
      </ListHeader>
    </div>
    <div class="items">
      <li v-for="item in props.items">
        <ListItem @click="onListItemClick(item)">
          <li v-for="(value, key, index) of filteredItem(item)">
            <Item :value="shortenedValue(value)"/>
          </li>
        </ListItem>
      </li>
    </div>
    <div v-if="props.items.length === 0" class="no-info">
      Brak dostępnych informacji
    </div>
  </div>
</template>

<style scoped>
.headers {
  @apply
  sticky
  top-0
  list-none;
}

.items {
  @apply
  list-none
  grid
  gap-2;
}
.no-info {
  @apply
  opacity-20
  italic
  text-2xl
    mt-4
  w-fit
  mx-auto
  text-nowrap
}
</style>