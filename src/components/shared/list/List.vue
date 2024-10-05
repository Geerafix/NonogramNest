<script setup>
import ListHeader from './ListHeader.vue'
import ListItem from './ListItem.vue';
import Item from './Item.vue';
import {computed} from "vue";
defineProps(['headers', 'items']);
const emit = defineEmits(['action']);

const itemAction = (item) => {
    emit('action', item);
};

const shortenedValue = (val) => val && val.length > 15 ? val.slice(0, 15).concat('...') : val;
</script>

<template>
    <div v-if="items">
        <div v-if="headers" class="headers">
            <li v-for="header of headers">
                <ListHeader :headerName="header" />
            </li>
        </div>
        <div class="items">
            <li v-for="item in items">
                <ListItem @click="itemAction(item)">
                    <div v-for="value in item">
                        <Item :value="shortenedValue(value)" />
                    </div>
                </ListItem>
            </li>
        </div>
    </div>
</template>

<style scoped>
.headers {
    @apply
    sticky
    top-0
    grid
    grid-cols-[repeat(auto-fit,minmax(0,1fr))]
    gap-2
    p-2
    mb-2
    bg-gray-900/50 
    rounded-lg 
    list-none;
}
.items {
    @apply  
    grid
    gap-2
    mb-2
    mx-auto
    list-none;
}
</style>