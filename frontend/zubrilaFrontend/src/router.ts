import HomeView from './views/mainView.vue'
import AuthorizeView from './views/authorizeView.vue'
import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "./stores/auth.ts";
import ManageView from "./views/manageView.vue";
import ManageCardsView from "./views/manageCardsView.vue";
import LearnView from "./views/learnView.vue";
import LearnModeView from "./views/learnModeView.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/authorize', component: AuthorizeView },
    { path: '/manage', component: ManageView, meta:{auth:true} },
    { path:'/manage/:id', component: ManageCardsView,meta:{auth:true} },
    { path: '/learn', component: LearnView,meta:{auth:true} },
    { path: '/learn/:id', component: LearnModeView,meta:{auth:true} }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to) => {
    if (to.matched.some(record => record.meta.auth) && !useAuthStore().loggedIn) {
        return {path: '/authorize'}
    }
})
export default router;
