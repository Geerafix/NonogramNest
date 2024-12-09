<script setup>
import {ref} from "vue";
const isDisplayed = ref(false);
</script>

<template>
  <div>
    <div class="question-icon" @click="isDisplayed = !isDisplayed">
      <Icon icon="fa-solid fa-question"/>
    </div>
    <TransitionGroup name="fade" mode="out-in" tag="div">
      <div class="information" v-if="isDisplayed">
        <h1 class="rules-header">Zasady gry</h1>
        <div>
          <h1>1. Cel</h1>
          <p>
            • Codziennie rozwiązuj nonogram o rozmiarze planszy 10 x 10, aby zdobywać punkty.
          </p>
        </div>
        <div>
          <h1>2. Streak i mnożnik punktów</h1>
          <p>
            • Za systematyczne, codzienne rozwiązywanie wyzwań zwiększa się Twój streak, który jest liczony od pierwszego dnia, w którym wykonasz wyzwanie.<br>
            • Po rozwiązaniu wyzwania, maksymalna możliwa liczba punktów bazowych jest mnożona, dzielona przez 100, a następnie dodawana do końcowej punktacji.
          </p>
        </div>
        <div>
          <h1>3. Anulowania streak'a</h1>
          <p>
            • Jeśli opuścisz dzień wyzwania, Twój streak zostanie zresetowany do zera, a mnożnik punktów wróci do podstawowej wartości.<br>
            • Po zresetowaniu streak'a będzie on ponownie liczony od pierwszego dnia, w którym wykonasz wyzwanie.
          </p>
        </div>
        <div>
          <h1>4. Kalendarz</h1>
          <p>
            • Możesz przeglądać kalendarz, aby zobaczyć, w które dni rozwiązano wyzwanie.<br>
            • Rozwiązane wyzwania są oznaczone zielonym "listkiem".<br>
            • Kliknięcie na dzień w kalendarzu, w którym rozwiązano wyzwanie, wyświetli informację o zdobytych punktach i czasie rozwiązywania.
          </p>
        </div>
        <div class="italic text-2xl text-right mx-4">Miłej gry! ツ</div>
        <div></div>
      </div>
      <div v-if="isDisplayed" class="blurred-background"/>
    </TransitionGroup>
  </div>
</template>

<style scoped src="./help-style.css" />