import { createApp } from 'vue'
import { renderSSRHead } from '@unhead/ssr'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import router from './router'

export async function render(url) {
  const app = createApp(App)
  const head = createHead()
  
  app.use(head)
  app.use(router)
  
  // Set the router to the requested URL
  await router.push(url)
  await router.isReady()
  
  // Render the app
  const ctx = {}
  const html = await renderToString(app, ctx)
  
  // Generate head payload
  const headPayload = await renderSSRHead(head)
  
  return {
    html,
    headPayload
  }
}
