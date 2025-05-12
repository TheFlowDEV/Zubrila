<script setup lang="ts">
 import {defineProps} from "vue"
 const props = defineProps({title:String,description:String,redact:Boolean,id:String})
 const emits = defineEmits(["edit","delete"])
</script>

<template>
  <div ref="containerRef" class="relative p-6 bg-white shadow rounded-lg hover:shadow-md transition  max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-72 lg:h-72 xl:h-80">
    <h2 class="text-xl font-semibold mb-2 text-center text-ellipsis">{{props.title}}</h2>
    <p class="multi-ellipsis whitespace-normal break-words text-gray-600">{{props.description}}</p>
    <img src="/delete.svg" v-show="redact" @click="(e)=>{e.stopPropagation();emits('delete',id)}" class="absolute left-10 bottom-10" alt="Х">
    <img src="/edit.svg" v-show="redact" @click="(e)=>{e.stopPropagation();emits('edit',id)}" class="absolute right-10 bottom-8" alt="Редактировать">
  </div>
</template>

<style scoped>
.multi-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  overflow: hidden;
}
</style>