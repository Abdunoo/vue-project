import { createApp } from './main'

const { app, head, router } = createApp()

router.isReady().then(() => {
  app.mount('#app')
  head.mount()
})
