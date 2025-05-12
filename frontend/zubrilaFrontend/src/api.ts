// api.ts
import axios, {type InternalAxiosRequestConfig} from "axios";
import { type AxiosInstance, type AxiosRequestConfig, AxiosError } from 'axios';
import router from './router'
import { useAuthStore } from './stores/auth'

const api: AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const auth = useAuthStore()
    if (auth.token) {
        config.headers.set('Authorization', `Bearer ${auth.token}`)
    }
    return config
})

let isRefreshing = false
let failedQueue: Array<{
    resolve: (value?: any) => void
    reject: (error: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token))
    failedQueue = []
}

async function refreshToken(): Promise<string> {
    // эндпоинт на обновление
    let res = await api.post('/users/refreshToken', {refreshToken:useAuthStore().refreshToken}, {withCredentials: true});
    return res.data.token as string;
}

api.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
        const auth = useAuthStore()

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then(token => {
                    originalRequest.headers!['Authorization'] = `Bearer ${token}`
                    return api(originalRequest)
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            return refreshToken()
                .then(token => {
                    // кладём в Pinia
                    auth.setToken(token)
                    processQueue(null, token)
                    // повторяем исходный запрос
                    originalRequest.headers!['Authorization'] = `Bearer ${token}`
                    return api(originalRequest)
                })
                .catch(err => {
                    processQueue(err, null)
                    auth.clear()
                    router.push({ path: '/authorize' }).then(()=>{
                        return Promise.reject(err)
                    })
                })
                .finally(() => {
                    isRefreshing = false
                })
        }

        return Promise.reject(error)
    }
)

export default api
