import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import api from '../src/services/api'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.provide('axios', api)

app.use(createPinia())
app.use(router)

app.mount('#app')
