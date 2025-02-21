import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead, HeadVuePlugin } from '@vueuse/head'

const app = createApp(App)
const head = createHead()
app.use(HeadVuePlugin, head)
app.use(head)

app.use(router)
app.mount('#app')
