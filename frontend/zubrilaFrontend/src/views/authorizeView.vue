<script setup lang="ts">
import {ref, inject} from 'vue'
import {useAuthStore} from "../stores/auth.ts";
import { useRouter } from 'vue-router'
import {type AxiosInstance} from "axios";
const router = useRouter()
let registration = ref(false);
let email = ref('');
let password = ref('');
let error = ref("");
const authStore = useAuthStore();
const api = inject<AxiosInstance>("api")
async function login(){
  if (api){
    api.post(registration.value?"/users/register":"/users/login",{email:email.value,password:password.value}).catch((err)=>{
      error.value=`Произошла ошибка при запросе:${err}`;
    }).then((res)=>{
      console.log(res)
      if (res){
        authStore.setToken(res.data?.token)
        authStore.refreshToken = res.data?.refreshToken;
        router.push("/");
      }
    })
  }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="w-full max-w-md bg-white p-6 shadow-md space-y-4">
        <h1 class="text-2xl md:text-3xl text-center font-semibold">Вход в аккаунт</h1>
        <form class="w-full" @submit.prevent="login">
          <div class="space-y-1">
            <label class="block text-sm md:text-base font-medium">Email</label>
            <input v-model="email" type="email" class="w-full px-3 py-3 text-base rounded-md bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400" required />
          </div>
          <div class="space-y-1">
            <label class="block text-sm md:text-base font-medium">Password</label>
            <input v-model="password" type="password" class="w-full px-3 py-3 text-base rounded-md bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400" required/>
          </div>
          <label class="inline-flex items-center cursor-pointer">
            <span class="ms-3 text-sm font-medium text-black hover:underline" v-on:click="()=>{registration=!registration}">У вас нет аккаунта?<a v-if="!registration"> Зарегистрируйтесь</a><a v-if="registration"> Войдите</a></span>
          </label>
          <div class="mb-3">
            <span class="ms-3 text-sm font-medium text-red-700">{{error}}</span>
          </div>
          <button type="submit" class="w-full py-3 text-white bg-green-600 rounded-md text-base md:text-lg hover:bg-green-500 transition-all cursor-pointer" v-if="!registration">
            Войти
          </button>
          <button type="submit" class="w-full py-3 text-white bg-green-600 rounded-md text-base md:text-lg hover:bg-green-500 transition-all cursor-pointer" v-if="registration">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
</template>

<style scoped>


</style>