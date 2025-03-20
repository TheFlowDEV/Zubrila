<script setup lang="ts">

</script>

<template>
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="w-full max-w-md bg-white p-6 shadow-md space-y-4">
        <h1 class="text-2xl md:text-3xl text-center font-semibold">Вход в аккаунт</h1>
        <div class="space-y-1">
          <label class="block text-sm md:text-base font-medium">Email</label>
          <input type="email" class="w-full px-3 py-3 text-base rounded-md bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
        <div class="space-y-1">
          <label class="block text-sm md:text-base font-medium">Password</label>
          <input type="password" class="w-full px-3 py-3 text-base rounded-md bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer">
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-green-800 rounded-full peer dark:bg-white-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
          <span class="ms-3 text-sm font-medium text-black">Вход/Регистрация</span>
        </label>
        <button class="w-full py-3 text-white bg-green-600 rounded-md text-base md:text-lg hover:bg-green-500 transition-all cursor-pointer">
          Войти
        </button>
      </div>
    </div>
</template>

<style scoped>


</style>