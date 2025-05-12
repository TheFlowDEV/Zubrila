<script setup lang="ts">
import HeaderApp from "../components/header.vue"
import FooterApp from "../components/footer.vue"
import gridCard from "../components/gridCard.vue"
import {computed, onMounted, ref} from "vue"
import {useApiStore} from "../stores/api.ts";
import CardModal from "../components/cardModal.vue";
import {useRoute} from "vue-router"
const store = useApiStore();
const route = useRoute();
const deckName = ref("");
const modal = ref({show: false,name:"",answer:"",cardId:"",new:false});
function openModal(card:{
  id:string;
  name:string;
  answer:string;
}){
  modal.value={
    show:true,
    name:card.name,
    answer:card.answer,
    cardId:card.id,
    new:false
  }
}
function clearModal(){
  modal.value.cardId = "";
  modal.value.name = "";
  modal.value.answer = "";
  modal.value.show = false;
}
const cards = computed(()=>store.cards)
onMounted(()=>{
  store.getCards(route.params.id as string);
  let deckParent = store.decks.find((deck)=>deck.id === route.params.id);
  if (deckParent){
    deckName.value = deckParent.name;
  }
})
function saveChanges(){
  if (modal.value.new) store.addCard({
    name:modal.value.name,
    answer:modal.value.answer,
    deck_id:route.params.id as string,
  })
  else store.patchCard({
    id:modal.value.cardId,
    name:modal.value.name,
    answer:modal.value.answer,
    deck_id:route.params.id as string,
  })
  clearModal()
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header-app></header-app>
    <div class="mb-auto flex-grow" v-if="route.params.id">
      <section class="px-4 py-12 max-w-screen-xl mx-auto">
        <h1 class="text-4xl font-bold mb-6 text-center">Управление картами колоды {{deckName}}</h1>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <grid-card v-for="card in cards" :key=card.id :title=card.name @edit="()=>openModal({
          id:card.id,
          name:card.name,
          answer:card.answer,
          })" @delete="()=>store.deleteCard(card.id)" :description=card.answer  :redact=true></grid-card>
          <div ref="containerRef" class="flex justify-center items-center p-6
          border border-sky-500 max-w-xs sm:max-w-sm md:max-w-md
          lg:max-w-lg xl:max-w-xl h-72 lg:h-72 xl:h-80 cursor-pointer" v-on:click="()=>{
            modal = {...modal,show:true,new:true}
          }">
            <img src="/plus.svg" alt="+">
          </div>
        </div>

      </section>
    </div>
    <footer-app></footer-app>
    <CardModal v-model:show=modal.show v-model:name="modal.name" v-model:answer="modal.answer" @cancel="clearModal" @save="saveChanges"></CardModal>
  </div>
</template>

<style scoped>

</style>