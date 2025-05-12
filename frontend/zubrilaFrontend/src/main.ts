import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"
import {createPinia} from "pinia"
import api from "./api"
import router from "./router"

createApp(App)
    .use(router)
    .use(createPinia())
    .provide("api",api)
    .mount('#app')
