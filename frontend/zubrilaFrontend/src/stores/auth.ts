import { defineStore } from 'pinia'
type authState = {
    token: string|null;
    refreshToken: string|null;
    loggedIn: boolean
}
export const useAuthStore = defineStore('auth', {
    state: ():authState => {
        return { token: null,
            refreshToken:null,
            loggedIn: false }
    },
    actions: {
        setToken(token:string){
            this.token = token;
            this.loggedIn=true;
            return true;
        },
        clear(){
            this.loggedIn=false;
            this.token = null;
            this.refreshToken = null;
        }
    },
})