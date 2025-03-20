import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"
import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './components/mainPage.vue'
import AuthorizeView from './components/registrationComponent.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/authorize', component: AuthorizeView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
createApp(App)
    .use(router)
    .mount('#app')
