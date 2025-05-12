<script setup lang="ts">
  import { ref, watch } from 'vue'
  const props = defineProps({show:Boolean,name:String,description:String})
  const emits = defineEmits(["cancel","save","update:name","update:description"])
  const localName = ref(props.name)
  const localDescription = ref(props.description);

  watch(() => props.name, (newVal) => {
    localName.value = newVal
  })
  watch(localName, (newVal) => {
    emits('update:name', newVal)
  })
  watch(localDescription, (newVal) => {
    emits('update:description', newVal)
  })

</script>

<template>
  <div v-show="props.show" class="fixed inset-0 bg-black/50  flex flex-col items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
      <!-- Header -->
      <div class="px-6 py-4 border-b">
        <h3 class="text-lg font-semibold text-center">
          Колода {{props.name?props.name:""}}
        </h3>
      </div>
      <!-- Body -->
      <div class="px-6 py-4 space-y-4">
        <div class="flex items-center">
          <label class="w-24 font-medium">Название</label>
          <input
              v-model="localName"
              type="text"
              class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
        <div class="flex items-start">
          <label class="w-24 font-medium">Описание</label>
          <textarea
              v-model="localDescription"
              rows="6"
              class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring resize-none"
          ></textarea>
        </div>
      </div>
      <!-- Footer -->
      <div class="px-6 py-4 flex justify-center space-x-4">
        <button
            class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
            @click='emits("cancel")'

        >
          Отмена
        </button>
        <button
            class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
            @click='emits("save")'
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>