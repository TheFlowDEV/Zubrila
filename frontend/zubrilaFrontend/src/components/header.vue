<script setup lang="ts">

</script>

<template>
  <nav class="bg-white border-b border-b-gray-600">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/" class="text-2xl md:text-3xl text-center font-semibold hover:text-gray-600">Зубрила</router-link>
      <div class="block w-auto" id="navbar-default">
        <ul class="font-medium flex p-4 md:p-0 border-gray-100 rounded-lg  flex-row md:space-x-8 rtl:space-x-reverse mt-0 border-0 bg-white">
          <li>
            <router-link to="/authorize" class="block py-2 px-3 text-black hover:underline text-base rounded-sm hover:text-gray-600" aria-current="page">Войти</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>