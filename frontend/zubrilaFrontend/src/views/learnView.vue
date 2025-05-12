<script setup lang="ts">
import HeaderApp from "../components/header.vue"
import FooterApp from "../components/footer.vue"
import gridCard from "../components/gridCard.vue";
import {computed, onMounted} from "vue"
import {useApiStore} from "../stores/api.ts";
import {useRouter} from "vue-router";
const store = useApiStore();
const decks = computed(()=>store.decks)
const router = useRouter();
onMounted(()=>{
  store.getDecks();
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header-app></header-app>
    <div class="mb-auto flex-grow">
      <section class="px-4 py-12 max-w-screen-xl mx-auto">
        <h1 class="text-4xl font-bold mb-6 text-center">Выберите колоду для зазубривания</h1>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <grid-card v-on:click="()=>{
            router.push(`/learn/${deck.id}`)
          }" v-for="deck in decks" :key=deck.id :title=deck.name :description=deck.description></grid-card>
        </div>
      </section>
    </div>
    <footer-app></footer-app>
  </div>
</template>

<style scoped>

</style>