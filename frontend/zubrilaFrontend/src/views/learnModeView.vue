<script setup lang="ts">
import HeaderApp from "../components/header.vue"
import FooterApp from "../components/footer.vue"
import {onMounted, ref} from "vue"
import {useApiStore} from "../stores/api.ts";
import {useRoute, useRouter} from "vue-router";
import type {Card} from "../types/card.ts";
import LearnCard from "../components/learnCard.vue";
const store = useApiStore();
const cards = ref<Card[]>([]);
const route = useRoute();
const router = useRouter();
const forgotCount = ref(0);
const currentCount = ref(1);
const allCounts = ref(0);
const currentCard = ref<Card>();
function shuffleArray(array:Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function getCard(){
  currentCard.value = cards.value.shift();
}
function initializeLearning() {
  store.getCards(route.params.id as string).catch(()=>{
    alert("Произошла ошибка при получении данных. Возврат на страницу выбора...")
    router.push(`/learn`)
  }).then(()=>{
    shuffleArray(store.cards);
    allCounts.value = store.cards.length;
    cards.value = store.cards;
    getCard();
  });
}
onMounted(initializeLearning)
</script>

<template>
  <div class="relative flex flex-col min-h-screen">
    <header-app></header-app>
    <h1 class="text-4xl font-bold mb-6 text-center" v-if="currentCount <= allCounts">Учить</h1>
    <div v-if="currentCount <= allCounts">
      <main class="relative flex-grow flex items-center justify-center px-4 max-w-screen-xl mx-auto">
          <section class="w-full h-full flex justify-center items-center">
            <LearnCard :key="currentCard?.id" :title="currentCard?.name" :answer="currentCard?.answer" @swipe="({direction})=>{
              if (direction === 'left'){
                forgotCount++;
                if (currentCard){
                   cards.push(currentCard)
                }
              }
              else{
                currentCount++;
              }
              getCard();

            }" />
          </section>
      </main>
      <div class="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col items-center" @click="()=>{
        forgotCount++;
                if (currentCard){
                   cards.push(currentCard)
                }
                getCard();
      }">
        <img src="/leftArrow.png" alt="<-" class="w-3 h-3 lg:w-12 lg:h-12 mb-2" />
        <span class="text-xl font-bold text-center">Забыл</span>
      </div>
    <div class="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center" @click="()=>{
      currentCount++;
      getCard();
    }">
      <img src="/rightArrow.png" alt="->" class="w-3 h-3 lg:w-12 lg:h-12 mb-2" />
      <span class="text-xl font-bold text-center">Знаю</span>
    </div>
    <div class="flex justify-center"><span class="mb-6 text-center">{{currentCount}}/{{allCounts}} карт</span></div>

    </div>
    <div class="flex-grow flex items-center justify-center px-4 max-w-screen-xl mx-auto flex-col" v-else>
      <h2 class="text-bold mb-2">Поздравляю!</h2>
      <h2 class="text-bold mb-2">Вы покорили {{store.decks.find(el=>el.id===route.params.id)?.name}}</h2>
      <h2 class="text-bold mb-2">Ваш результат:</h2>
      <p>
        Забывания:{{forgotCount}}
      </p>
      <p class="mb-4">
        <span v-if="forgotCount===0" >Похоже, вы настоящий <b>Зубрила</b>!</span>
        <span v-else>Похоже,что вы забывали, попробуйте ещё раз</span>
      </p>
      <div class="flex gap-2 justify-center">
        <button class="cursor-pointer border px-2 py-1 rounded-md" @click="()=>{
          forgotCount=0;
          currentCount=1;
          initializeLearning()
          }
        ">Учить заново</button>
        <button class="cursor-pointer border px-2 py-1 rounded-md" @click="()=>router.push('/manage')">Вернуться к колодам</button>
      </div>
    </div>
  </div>
  <footer-app></footer-app>
</template>

<style scoped>

</style>