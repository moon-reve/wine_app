import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { fetchPlaceImageAsset, fetchPlaceOgImage } from './api/_lib/placeImage.ts'

// Mirrors api/place-image.ts so the endpoint also works under `vite dev`,
// since Vercel's /api serverless functions aren't served locally without `vercel dev`.
function kakaoPlaceImageDevMiddleware(): Plugin {
  return {
    name: 'kakao-place-image-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/place-image', async (req, res) => {
        const placeUrl = new URL(req.url ?? '', 'http://localhost').searchParams.get('url')
        const rawMode = new URL(req.url ?? '', 'http://localhost').searchParams.get('raw') === '1'

        if (rawMode && placeUrl) {
          const asset = await fetchPlaceImageAsset(placeUrl)
          if (!asset) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ image: null }))
            return
          }

          res.setHeader('Content-Type', asset.contentType)
          res.setHeader('Cache-Control', 'public, max-age=86400')
          res.end(asset.body)
          return
        }

        const image = placeUrl ? await fetchPlaceOgImage(placeUrl) : null
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
        res.end(JSON.stringify({
          image: image && placeUrl
            ? `/api/place-image?raw=1&v=4&url=${encodeURIComponent(placeUrl)}`
            : null,
        }))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit(filePath) {
      if (filePath.endsWith('chatbot-orb-frame-1.webp')) return true
      return undefined
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    kakaoPlaceImageDevMiddleware(),
    VitePWA({
      registerType: 'prompt',
      devOptions: { enabled: false },
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Viner',
        short_name: 'Viner',
        description: '와인을 좋아하는 사람들의 팬덤 커뮤니티',
        lang: 'ko',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#841317',
        background_color: '#841317',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        // 앱 셸(JS/CSS/HTML/아이콘)만 미리 캐시한다. 용량이 큰 사진 에셋(png)들은
        // 아래 runtimeCaching으로 방문한 것만 그때그때 캐시한다.
        globPatterns: ['**/*.{js,css,html,ico,svg,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /^\/api\//,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: { maxEntries: 150, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
})
