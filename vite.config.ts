import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fetchPlaceOgImage } from './api/_lib/placeImage.ts'

// Mirrors api/place-image.ts so the endpoint also works under `vite dev`,
// since Vercel's /api serverless functions aren't served locally without `vercel dev`.
function kakaoPlaceImageDevMiddleware(): Plugin {
  return {
    name: 'kakao-place-image-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/place-image', async (req, res) => {
        const placeUrl = new URL(req.url ?? '', 'http://localhost').searchParams.get('url')
        const image = placeUrl ? await fetchPlaceOgImage(placeUrl) : null
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
        res.end(JSON.stringify({ image }))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), kakaoPlaceImageDevMiddleware()],
})
