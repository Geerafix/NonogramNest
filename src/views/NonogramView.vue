<script setup>
import { ref } from 'vue'
import Nonogram from '@/components/Nonogram.vue';
import BasicButton from '@/UIcomponents/BasicButton.vue';

let answers = ref([]);
let nonogram = ref([]);
let cluesX = ref([]);
let cluesY = ref([]);
let size = 5;

// funkcja sprawdzająca nasze rozwiązanie
function check() {
    let iX = 0, iY = 0;
    let checkX = [], checkY = [];
    let ansX = 0, ansY = 0;
    for (let row = 0; row < nonogram.value.length; row++) {
        checkX.push([]);
        checkY.push([]);
        for (let col = 0; col < nonogram.value.length; col++) {
            if (answers.value[row][col] === 1) {
                ansX += 1;
            }
            if (answers.value[row][col] === 0 && ansX !== 0) {
                checkX[row][iX++] = ansX;
                ansX = 0;
            }
            if (answers.value[col][row] === 1) {
                ansY += 1;
            }
            if (answers.value[col][row] === 0 && ansY !== 0) {
                checkY[row][iY++] = ansY;
                ansY = 0;
            }
        }
        if (ansX !== 0) {
            checkX[row][iX++] = ansX;
            ansX = 0;
        }
        if (ansY !== 0) {
            checkY[row][iY++] = ansY;
            ansY = 0;
        }
        iX = 0;
        iY = 0;
    }

    let isSolvedX = true, isSolvedY = true;
    cluesX.value.forEach((row, rowIndex) => {
        row.forEach((element, colIndex) => {
            if (element !== checkX[rowIndex][colIndex]) {
                isSolvedX = false;
            }
        });
    });
    cluesY.value.forEach((row, rowIndex) => {
        row.forEach((element, colIndex) => {
            if (element !== checkY[rowIndex][colIndex]) {
                isSolvedY = false;
            }
        });
    });

    if (isSolvedX === true && isSolvedY) {
      alert("Dobrze");
    } else {
      alert("Źle");
    }
}

// funkcja kolorująca pojedynczą kratkę
function paint(row, col, cell) {
    if (answers.value[row][col] === 0) {
        answers.value[row][col] = 1;
        cell.style.backgroundColor = 'black';
    } else {
        answers.value[row][col] = 0;
        cell.style.backgroundColor = 'white';
    }
    console.log(row + ", " + col);
}

// funkcja generująca nowy nonogram
function generateAndFindHints() {
    answers.value = [];
    nonogram.value = [];
    cluesX.value = [];
    cluesY.value = [];
    for (let row = 0; row < size; row++) {
        answers.value.push([]);
        nonogram.value.push([]);
        for (let col = 0; col < size; col++) {
            answers.value[row][col] = 0;
            nonogram.value[row].push(Math.floor(Math.random() * 2));
        }
    }
    let ansX = 0, ansY = 0;
    for (let row = 0; row < nonogram.value.length; row++) {
        cluesX.value.push([]);
        cluesY.value.push([]);
        for (let col = 0; col < nonogram.value.length; col++) {
            if (nonogram.value[row][col] === 1) {
                ansX += 1;
            }
            if (nonogram.value[row][col] === 0 && ansX !== 0) {
                cluesX.value[row].push(ansX);
                ansX = 0;
            }
            if (nonogram.value[col][row] === 1) {
                ansY += 1;
            }
            if (nonogram.value[col][row] === 0 && ansY !== 0) {
                cluesY.value[row].push(ansY);
                ansY = 0;
            }
        }
        if (ansX !== 0) {
            cluesX.value[row].push(ansX);
            ansX = 0;
        }
        if (ansY !== 0) {
            cluesY.value[row].push(ansY);
            ansY = 0;
        }
    }
}
</script>

<template>
  <main class="h-full relative">
    <Nonogram :cluesX="cluesX" :cluesY="cluesY" :size="nonogram.length" :paint="paint"/>
    <BasicButton btnText="Nowy nonogram" @click="generateAndFindHints()" class="absolute left-0 bottom-0"/>
    <BasicButton btnText="Sprawdź" @click="check()" class="absolute right-0 bottom-0"/>
  </main>
</template>
