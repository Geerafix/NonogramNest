<script setup>
import {ref, watchEffect} from "vue";
import {watchDeep} from "@vueuse/core";

const props = defineProps(['user']);

const source = ref('');

watchEffect( () => {
  if (props.user?.pfp?.data) {
    const bytes = new Uint8Array(props.user.pfp.data);
    let ascii = "";
    for (let i = 0; i < bytes.length; i++) {
      ascii += String.fromCharCode(bytes[i]);
    }
    source.value = ('data:image/png;base64,').concat(ascii);
  }
})
</script>

<template>
  <div class="user-profile-container">
    <div class="info-col">
      <div class="grid grid-cols-[auto_1fr] gap-2 [&_div]:!h-full">
        <div class="p-2 aspect-square bg-gray-800/80 rounded-lg h-min w-min">
          <Transition name="fade" mode="out-in">
            <div class="content-center" :key="user">
              <img v-if="user.pfp?.data?.length" :src="source" class="rounded-md"/>
              <Icon v-else icon="fa-solid fa-user" class="my-auto mx-auto h-full"/>
            </div>
          </Transition>
        </div>
        <div class="grid gap-2">
          <div class="info">{{ user.username }}</div>
          <div class="bg-gray-800/50 rounded-lg content-center px-2">UID: {{ user.user_id }}</div>
        </div>
      </div>
      <div>
        <textarea disabled class="bio" :placeholder="user.bio ? '' : 'Brak opisu'">{{ user.bio }}</textarea>
      </div>
    </div>
    <div class="stats-col">
      <div class="item-container">Rozwiązane gry</div>
      <div class="item">{{ user.solved_puzzles }}</div>
      <div class="item-container">Rozwiązane wyzwania</div>
      <div class="item">{{ user.solved_challenges }}</div>
      <div class="item-container">Suma punktów</div>
      <div class="item">{{ user.total_points }}</div>
      <div class="item-container">Łączny czas gry</div>
      <div class="item">{{ (user.total_play_time / 3600).toFixed(2) }} h</div>
      <div class="item-container">Data rejestracji</div>
      <div class="item">{{new Date(user.register_date.toString()).toLocaleDateString()}}r</div>
    </div>
  </div>
</template>

<style scoped>
.user-profile-container {
  @apply
  grid
  sm:grid-cols-[24rem_24rem]
  max-sm:grid-rows-2
  gap-2
  p-2
  w-fit
  h-fit
  mx-auto
  bg-gray-600
  rounded-2xl
  border-b-4
  text-xl
  border-gray-700
  select-none
}

.info-col {
  @apply
  grid gap-2 p-2 text-center bg-gray-700 rounded-xl
}

.stats-col {
  @apply
  grid
  grid-cols-[min-content_auto]
  gap-2
  p-2
  bg-gray-700
  rounded-xl
  text-right
}

.item-container {
  @apply
  text-left
  text-nowrap
  content-center
  bg-gradient-to-r
  from-transparent
  to-gray-600/50
  rounded-lg
  pr-2;
}

.item {
  @apply
  p-2
  w-full
  bg-gray-600
  rounded-lg
  text-right
  content-center
  drop-shadow-sm
  shadow-inner;
}

.bio {
  @apply
  bg-gray-800/50
  w-full
  min-h-full
  p-2
  rounded-lg
  text-wrap
  resize-none
  outline-none
}

.info {
  @apply
  bg-gray-800/75
  rounded-lg
  text-2xl
  font-normal
  content-center
}

.pfp {
  @apply
  flex
  justify-center
  p-2
  bg-gray-800/50
  rounded-lg
  [&>img]:rounded-md
  [&>*]:!h-20
  [&>*]:!w-20
  cursor-pointer
}
</style>