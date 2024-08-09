<script setup>
import ListHeader from './ListHeader.vue'
import ListItem from './ListItem.vue';
import Item from './Item.vue';
defineProps(['headers', 'items']);
</script>

<template>
    <div>
        <div class="headers">
            <li v-for="header of headers">
                <ListHeader :headerName="header" />
            </li>
        </div>
        <div class="items">
            <li v-for="item in items">
                <ListItem>
                    <div v-for="value in item">
                        <Item :value="value.length > 15 ? value.slice(0, 15).concat('...') : value" />
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
    bg-gray-900/60 
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