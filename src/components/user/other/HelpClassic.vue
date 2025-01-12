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
      <div v-if="isDisplayed" class="information">
        <h1 class="rules-header">Zasady gry</h1>
        <div>
          <h1>1. Cel</h1>
          <p>
            • Uzupełnij siatkę, zaznaczając pola na podstawie
            podanych wskazówek liczbowych, aby odkryć ukryty wzór lub obrazek.
          </p>
        </div>
        <div>
          <h1>2. Wskazówki liczbowe</h1>
          <p>
            • Liczby na krawędziach wierszy i kolumn oznaczają długość ciągów wypełnionych pól.<br>
            • Kolejność liczb odpowiada kolejności ciągów w danym wierszu lub kolumnie.<br>
            • Między ciągami musi być przynajmniej jedno puste pole.
          </p>
        </div>
        <div>
          <h1>3. Zaznaczanie pól</h1>
          <p>
            • Wypełnione pola oznaczaj kolorem czarnym (LPM).<br>
            • Pola wyłączone z gry zaznaczaj symbolem ⨯ (PPM).
          </p>
        </div>
        <div>
          <h1>4. Logika i eliminacja</h1>
          <p>
            • Analizowanie wskazówkek i używanie logiki jest konieczne do wykluczenia niemożliwych opcji.<br>
            • Wyznaczanie pól wyłączonych z gry jest często niezbędne do rozwiązania planszy.
          </p>
        </div>
        <div>
          <h1>5. Poprawność</h1>
          <p>
            • Rozwiązanie musi spełniać wszystkie wskazówki dla wierszy i kolumn.<br>
            • Wypełniona siatka tworzy kompletny wzór.<br>
            • Gdy jesteś pewien rozwiązania, zatwierdź je, aby ukończyć łamigłówkę.
          </p>
        </div>
        <div>
          <h1>6. Punktacja</h1>
          <p>
            • Za poprawne rozwiązanie planszy otrzymujesz punkty bazowe.<br>
            • Zatwierdzenie niepoprawnego rozwiązania powoduje utratę punktów.<br>
            • Jeśli ukończysz planszę w czasie perfekcyjnym, krótszym niż (rozmiar planszy)<sup class="text-sm">2</sup>
            sekund,
            otrzymasz dodatkowe punkty bonusowe równe punktom bazowym za daną planszę.
          </p>
        </div>
        <div>
          <h1>7. Stopień trudności</h1>
          <p>
            • Rozmiar siatki i złożoność wskazówek wpływają na poziom trudności łamigłówki.
          </p>
        </div>
        <div>
          <h1>8. Opcje w grze</h1>
          <p>
            • Grę możesz wznawiać, zatrzymywać lub anulować w dowolnym momencie.<br>
            • Stan rozpoczętej gry jest zapisywany do czasu wylogowania.
          </p>
        </div>
        <div class="italic text-2xl text-right mx-4">Miłej gry! ツ</div>
        <div></div>
      </div>
      <div v-if="isDisplayed" class="blurred-background"/>
    </TransitionGroup>
  </div>
</template>

<style scoped src="./help-style.css"/>