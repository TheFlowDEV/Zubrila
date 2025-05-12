<script setup lang="ts">
  import HeaderApp from "../components/header.vue"
  import FooterApp from "../components/footer.vue"
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header-app></header-app>
    <div class="mb-auto flex-grow">
      <section class="px-4 py-12 max-w-screen-xl mx-auto">
        <h1 class="text-4xl font-bold mb-6">Добро пожаловать в Зубрилу</h1>
        <p class="text-lg text-gray-600 mb-10 max-w-2xl">
          Платформа для быстрого и удобного обучения с карточками, тестами и статистикой.
        </p>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <div class="p-6 bg-white shadow rounded-lg hover:shadow-md transition">
            <h2 class="text-xl font-semibold mb-2">Карточки</h2>
            <p class="text-gray-600">Повторяй материал.</p>
          </div>
          <div class="p-6 bg-white shadow rounded-lg hover:shadow-md transition">
            <h2 class="text-xl font-semibold mb-2">Тесты</h2>
            <p class="text-gray-600">Проверь свои знания с помощью интерактивных тестов.</p>
          </div>
          <div class="p-6 bg-white shadow rounded-lg hover:shadow-md transition">
            <h2 class="text-xl font-semibold mb-2">Статистика</h2>
            <p class="text-gray-600">Отслеживай свой прогресс и не теряй мотивацию.</p>
          </div>
        </div>
        <p class="text-lg text-gray-600 mb-10 max-w-2xl">
          Регистрируйся и составляй свои колоды!
        </p>

      </section>
    </div>
    <footer-app></footer-app>
  </div>
</template>

<style scoped>

</style>