<script setup>
import { ref } from 'vue'
    
let clues = ref([]);
let nonogram = ref([]);
let ansX = ref([]);
let ansY = ref([]);
let coords = ref([]);
const size = 6;

// funkcja sprawdzająca nasze rozwiązanie
function check() {
    let isSolved = true;
    if (clues.value.length === coords.value.length) {
        if (clues.value.forEach(item => {
            if (!coords.value.some(clue => clue.i === item.i && clue.j === item.j)) {
                isSolved = false;
                console.log(item.i + " " + item.j);
            }
        }));
    } else {
        isSolved = false;
        alert('Spróbuj jeszcze raz');
        return;
    }

    if (isSolved) {
        alert('Nonogram ukończony'); 
    } else {
        alert('Spróbuj jeszcze raz');
    }
    console.log(clues);
}

// funkcja kolorująca pojedynczą kratkę
function paint(row, col, cell) {
    const clue = {i: col, j: row};
    if (!clues.value.some(item => item.i === clue.i && item.j === clue.j)) {
        clues.value.push(clue);
        cell.style.backgroundColor = 'black';
    } else {
        clues.value.splice(clues.value.indexOf(clues.value.find(item => item.i === clue.i && item.j === clue.j)), 1);
        cell.style.backgroundColor = 'white';
    }
    console.log(clue);
}

function generateAndFindHints() {
  clues.value = [];
  ansX.value = [];
  ansY.value = [];
  nonogram.value = [];
  for (let row = 0 ; row < size ; row++) {
    nonogram.value.push([]);
    for (let col = 0 ; col < size ; col++) {
      nonogram.value[row].push(Math.floor(Math.random() * 2));
    }
  }
  let ans = 0;
  for (let row = 0 ; row < nonogram.value.length ; row++) {
    ansY.value.push([]);
    for (let col = 0 ; col < nonogram.value.length; col++) {
      if (nonogram.value[row][col] === 1) {
        ans += 1;
        coords.value.push({i: row + 1, j: col + 1});
      }
      if (nonogram.value[row][col] === 0 && ans !== 0) {
        ansY.value[row].push(ans);
        ans = 0;
      }
    }
    if (ans !== 0) {
      ansY.value[row].push(ans);
      ans = 0;
    }
  }
  ans = 0;
  for (let col = 0 ; col < nonogram.value.length ; col++) {
    ansX.value.push([]);
    for (let row = 0 ; row < nonogram.value.length; row++) {
      if (nonogram.value[row][col] === 1) {
        ans += 1;
      }
      
      if (nonogram.value[row][col] === 0 && ans !== 0) {
        ansX.value[col].push(ans);
        ans = 0;
      }
    }
    if (ans !== 0) {
      ansX.value[col].push(ans);
      ans = 0;
    }
  }
  console.log(nonogram.value);
}
</script>

<template>
    <main class="mx-auto mt-6 w-fit">
        <div class="grid gap-0.5 grid-cols-[min-content_1fr]">
            <div class="w-fit"></div>
            <div class="bg-gray-600 p-1 rounded-sm flex gap-0.5">
                <div v-for="ans in ansX" class="content-end">
                    <div class="w-14 rounded-sm text-center text-white flex flex-col">
                        <div v-for="single in ans" class="text-xl">
                            <p>{{ single }}</p>
                        </div>
                    </div>
                </div>           
            </div>
            <div class="bg-gray-600 p-1 rounded-sm w-fit flex flex-col gap-0.5">
                <div v-for="ans in ansY" class="mx-1.5 flex justify-end items-center">
                    <div class="h-14 rounded-sm text-center text-white flex items-center">
                        <div v-for="single in ans" class="text-xl">
                            <p>&nbsp;{{ single }}&nbsp;</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-700 rounded-sm p-1 grid grid-flow-col gap-0.5">
                <div v-for="row in nonogram.length" class="grid grid-flow-row gap-0.5">
                    <div class="w-14 h-14 rounded-sm bg-white text-center cursor-pointer transition" 
                        v-for="col in nonogram.length" 
                        @click="paint(row, col, $event.target)">  
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center gap-1">
            <button 
                class="bg-cyan-800 p-2 mt-2 rounded-sm text-white flex hover:bg-cyan-700 transition" 
                @click="generateAndFindHints()">Nowy nonogram
            </button>
            <button 
                class="bg-green-700 p-2 mt-2 rounded-sm text-white flex hover:bg-green-600 transition" 
                @click="check()">Sprawdź
            </button>
        </div>
    </main>
</template>