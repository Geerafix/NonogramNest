<script setup>
import {ref} from 'vue';
import {set} from '@vueuse/core';
import {onClickOutside} from "@vueuse/core";

const props = defineProps(['items']);
const emit = defineEmits(['onSelect']);

const target = ref(null);
onClickOutside(target, event => set(expanded, false));

const selected = ref(props.items[props.items.length - 1].name);
const expanded = ref(false);

const onSelect = (item) => {
  set(selected, item.name);
  set(expanded, false);
  emit('onSelect', item.value);
};
</script>

<template>
  <Transition name="fade" ref="target">
    <div>
      <Transition name="fade" mode="out-in">
        <ul v-if="expanded">
          <li v-for="item in props.items" @click="onSelect(item)">
            <div :class="['item', {'selected': selected === item.name }]">{{ item.name }}</div>
          </li>
        </ul>
      </Transition>
      <div class="select" @click="expanded = !expanded">
        <div class="my-auto mr-3">{{ selected }}</div>
        <Icon icon="fa-solid fa-chevron-up" :class="['icon', { '-rotate-180': expanded }]"/>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.select {
  @apply
  grid
  grid-cols-[1fr_auto]
  justify-between
  px-3
  rounded-xl
  min-h-14
  min-w-36
  bg-cyan-800
  border-slate-800/60
  hover:rounded-[20px]
  border-b-4
  text-xl
  transition-all
  outline-none
  text-nowrap
  cursor-pointer;
}

.icon {
  @apply
  my-auto
  mx-auto
  text-base
  transition-all;
}

ul {
  @apply
  flex
  flex-col
  gap-1.5
  min-w-36
  absolute
  bottom-16
  rounded-2xl
  border-b-4
  bg-cyan-800
  border-slate-800/60;
}

li {
  @apply
  text-center
  text-xl
  w-full
  rounded-2xl
  shadow-black
  hover:bg-cyan-900/70
  hover:shadow-inner
  drop-shadow-sm
  transition-all
  cursor-pointer;
}

.selected {
  @apply
  rounded-xl
  border-x-4
  border-y-[1px]
  bg-cyan-900/30
  border-cyan-900

}

.item {
  @apply
  py-1.5
}
</style>