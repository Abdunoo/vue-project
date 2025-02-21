import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import compression from 'compression'
import serveStatic from 'serve-static'
import { render } from './dist/server/entry-server.js'
import { readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

// Enable gzip compression
app.use(compression())

// Serve static assets from dist/client
app.use(serveStatic(resolve(__dirname, 'dist/client'), {
  index: false // Don't serve index.html for the root path
}))

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl
    const { html, headPayload } = await render(url)

    // Read the client index.html
    const template = await readFileSync(resolve(__dirname, 'dist/client/index.html'), 'utf-8')

    // Replace the placeholders
    const renderedHtml = template
      .replace('<!--app-html-->', html)
      .replace('<!--head-tags-->', headPayload.headTags)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(renderedHtml)
  } catch (e) {
    console.error(e)
    res.status(500).end(e.stack)
  }
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
}) 