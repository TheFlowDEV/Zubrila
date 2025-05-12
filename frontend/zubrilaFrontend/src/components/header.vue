<script setup lang="ts">
import { useAuthStore } from "../stores/auth.ts";
import { onBeforeUnmount, onMounted, ref } from "vue";

const authStore = useAuthStore();
const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);

// Флаг для бургер‑меню
const isMenuOpen = ref(false);

function handleClickOutside(event: MouseEvent) {
  if (
      dropdownRef.value &&
      !dropdownRef.value.contains(event.target as Node) &&
      buttonRef.value &&
      !buttonRef.value.contains(event.target as Node)
  ) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <nav class="bg-white border-b border-b-gray-600">
    <div class="max-w-screen-xl flex flex-wrap justify-between items-center mx-auto p-4">
      <router-link
          to="/"
          class="text-2xl md:text-3xl text-center font-semibold hover:text-gray-600"
      >
        Зубрила
      </router-link>

      <!-- Бургер: только на мобилке -->
      <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <div
          id="navbar-default"
          :class="[
          isMenuOpen ? 'block' : 'hidden',
          'md:flex'
        ]"
          class="flex justify-start w-full md:w-auto"
      >
        <ul
            v-if="!authStore.loggedIn"
            class="font-medium flex flex-col md:flex-row md:p-0 md:space-x-8 bg-white"
        >
          <li>
            <router-link
                to="/authorize"
                class="block py-2 text-black hover:underline text-base rounded-sm hover:text-gray-600"
            >
              Войти
            </router-link>
          </li>
        </ul>

        <ul
            v-else
            class="font-medium flex flex-col md:flex-row md:p-0 md:space-x-8 bg-white"
        >
          <li>
            <router-link
                to="/learn"
                class="block py-2 text-black hover:underline text-base rounded-sm hover:text-gray-600"
            >
              Учить
            </router-link>
          </li>
          <li>
            <router-link
                to="/manage"
                class="block py-2 text-black hover:underline text-base rounded-sm hover:text-gray-600"
            >
              Управление колодами
            </router-link>
          </li>
          <li>
            <div class="relative inline-block text-left">
              <button
                  ref="buttonRef"
                  @click="showDropdown = !showDropdown"
                  class="cursor-pointer"
              >
                <span
                    class="block py-2 text-black hover:underline text-base rounded-sm hover:text-gray-600"
                >
                  Профиль
                </span>
              </button>
              <div
                  ref="dropdownRef"
                  v-show="showDropdown"
                  class="
    absolute top-full right-0 z-10
    mt-2
    w-full md:w-56         /* full width на мобилках, узкий на ПК */
    origin-top-right
    rounded-md bg-white shadow-lg
    ring-1 ring-black/5
    focus:outline-hidden
  "
                  role="menu"
                  aria-orientation="vertical"
                  tabindex="-1"
              >
                <div class="py-1" role="none">
                  <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      @click="authStore.clear()"
                  >
                    Выход
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
