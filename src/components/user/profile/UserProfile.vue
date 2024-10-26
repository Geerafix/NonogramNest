<script setup>
defineProps(['user']);
</script>

<template>
  <div class="user-profile-container">
    <div class="info-col">
      <div class="info">
        <p>{{ user.username }}</p>
      </div>
      <div class="grid grid-cols-[auto_1fr] gap-2 [&_div]:!h-full">
        <div class="pfp" @click="open">
          <Icon icon="fa-solid fa-user" class="my-auto mx-auto text-5xl"/>
        </div>
        <div class="bg-gray-800/50 rounded-lg content-center p-2">UID: {{ user.user_id }}</div>
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
      <div class="item">{{ new Date(user.register_date).toLocaleDateString() }}r</div>
    </div>
  </div>
</template>

<style scoped>
.user-profile-container {
  @apply
  grid
  sm:grid-cols-2
  max-sm:grid-rows-2
  gap-2
  p-2
  w-full
  h-fit
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
  bg-gray-800/75 rounded-lg py-2 text-2xl font-normal content-center
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