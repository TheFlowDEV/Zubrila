<script setup lang="ts">
import HeaderApp from "../components/header.vue"
import FooterApp from "../components/footer.vue"
import gridCard from "../components/gridCard.vue";
import {computed, onMounted, ref} from "vue"
import {useApiStore} from "../stores/api.ts";
import DeckModal from "../components/deckModal.vue";
import type {Deck} from "../types/deck.ts";
import {useRouter} from "vue-router";
const router = useRouter();
const store = useApiStore();
const modal = ref({show: false,name:"",description:"",deckId:"",new:false});
function openModal(deck:Deck){
  modal.value={
    show:true,
    name:deck.name,
    description:deck.description,
    deckId:deck.id,
    new:false
  }
}
function clearModal(){
  modal.value.deckId = "";
  modal.value.name = "";
  modal.value.description = "";
  modal.value.show = false;
}
const decks = computed(()=>store.decks)
onMounted(()=>{
  store.getDecks();
})
function saveChanges(){
  if (modal.value.new) store.addDeck({
    name:modal.value.name,
    description:modal.value.description
  })
  else store.patchDeck({
    id:modal.value.deckId,
    name:modal.value.name,
    description:modal.value.description
  })
  clearModal()
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header-app></header-app>
    <div class="mb-auto flex-grow">
      <section class="px-4 py-12 max-w-screen-xl mx-auto">
        <h1 class="text-4xl font-bold mb-6 text-center">Управление колодами</h1>

        <div class="grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <grid-card v-on:click="()=>{
           router.push(`/manage/${deck.id}`)
          }" v-for="deck in decks" :key=deck.id :title=deck.name @edit="()=>openModal({
          id:deck.id,
          name:deck.name,
          description:deck.description,
          })" @delete="()=>store.deleteDeck(deck.id)" :description=deck.description  :redact=true></grid-card>
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
    <DeckModal v-model:show=modal.show v-model:name="modal.name" v-model:description="modal.description" @cancel="clearModal" @save="saveChanges"></DeckModal>
  </div>
</template>

<style scoped>

</style>