import './assets/main.css'
import { createApp as createVueApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createHead } from '@unhead/vue'

export function createApp() {
  const app = createVueApp(App)
  const router = createRouter()
  const head = createHead()

  app.use(router)
  app.use(head)

  return { app, router, head }
}
