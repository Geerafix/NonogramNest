<script setup>
import {ref} from "vue";

const isDisplayed = ref(false);
</script>

<template>
  <div>
    <div class="question-icon" @click="isDisplayed = !isDisplayed">
      <Icon icon="fa-solid fa-question"/>
    </div>
    <TransitionGroup mode="out-in" name="fade" tag="div">
      <div v-if="isDisplayed" class="information !overflow-auto">
        <h1 class="rules-header">Zasady</h1>
        <div>
          <h1>1. Tworzenie nonogramów</h1>
          <p>
            • Masz możliwość tworzenia własnych plansz o dowolnym rozmiarze oraz nadawania im nazw.
          </p>
        </div>
        <div>
          <h1>2. Zaznaczanie pól</h1>
          <p>
            • Aby zaznaczyć pole czarne, kliknij na komórkę planszy lewym przyciskiem myszy (LPM).<br>
            • Aby wyłączyć pole (oznaczyć je jako ⨯), kliknij na komórkę prawym przyciskiem myszy (PPM).
          </p>
        </div>
        <div>
          <h1>3. Opcje tworzenia</h1>
          <p>
            • Planszę możesz zresetować w dowolnym momencie.<br>
            • Stan tworzonej planszy jest zapisywany do czasu wylogowania.
          </p>
        </div>
        <div>
          <h1>4. Weryfikacja planszy</h1>
          <p>
            • Po stworzeniu nonogramu, plansza jest wysyłana do administracji w celu weryfikacji.<br>
            • Administracja ma prawo odrzucić planszę, jeśli jest niestosowna.
          </p>
        </div>
        <div class="italic text-2xl text-right mx-4">Miłego tworzenia plansz! ツ</div>
        <div></div>
      </div>
      <div v-if="isDisplayed" class="blurred-background"/>
    </TransitionGroup>
  </div>
</template>

<style scoped src="./help-style.css"/>