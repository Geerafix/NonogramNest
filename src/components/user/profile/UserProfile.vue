<script setup>
defineProps(['user']);
</script>

<template>
  <div class="user-profile-container pointer-events-none">
    <div class="grid gap-2 p-2 text-center bg-gray-700 rounded-xl">
      <div class="bg-gray-800/75 rounded-lg py-2 text-2xl font-normal content-center">
        <p>{{ user.username }}</p>
      </div>
      <div class="grid grid-cols-[1fr_1fr] gap-2">
        <div class="bg-gray-800/50 rounded-lg content-center py-2">
          <Icon icon="fa-solid fa-user" class="my-auto mx-auto text-5xl"/>
        </div>
        <div class="bg-gray-800/50 rounded-lg content-center">UID: {{ user.user_id }}</div>
      </div>
      <div>
        <textarea disabled class="bio">{{ user.bio }}</textarea>
      </div>
    </div>
    <div class="numbers">
      <div class="item-container">Rozwiązane gry</div>
      <div class="item">{{ user.solved_puzzles }}</div>
      <div class="item-container">Rozwiązane wyzwania</div>
      <div class="item">{{ user.solved_challenges }}</div>
      <div class="item-container">Suma punktów</div>
      <div class="item">{{ user.total_points }}</div>
      <div class="item-container">Łączny czas gry</div>
      <div class="item">{{ (user.total_play_time / 3600).toFixed(2) }} g.</div>
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

.numbers {
  @apply
  grid
  grid-cols-[min-content_1fr]
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
  bg-gray-600
  rounded-lg
  text-right
  drop-shadow-sm
  shadow-inner;
}

.bio {
  @apply
  bg-gray-800/50
  w-full
  h-full
  p-2
  rounded-lg
  text-wrap
  resize-none
  outline-none

}
</style>