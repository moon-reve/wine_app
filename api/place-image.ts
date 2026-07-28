import { fetchPlaceImageAsset, fetchPlaceOgImage } from './_lib/placeImage.js'

type ApiRequest = { query: Record<string, string | string[] | undefined> }
type ApiResponse = {
  status: (code: number) => ApiResponse
  setHeader: (name: string, value: string) => void
  json: (body: unknown) => void
  end: (body: Uint8Array) => void
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const rawUrl = req.query.url
  const placeUrl = Array.isArray(rawUrl) ? rawUrl[0] : rawUrl
  const rawMode = req.query.raw === '1'

  if (!placeUrl) {
    res.status(400).json({ image: null })
    return
  }

  if (rawMode) {
    const asset = await fetchPlaceImageAsset(placeUrl)
    if (!asset) {
      res.status(404).json({ image: null })
      return
    }

    res.setHeader('Content-Type', asset.contentType)
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
    res.status(200).end(asset.body)
    return
  }

  const image = await fetchPlaceOgImage(placeUrl)
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
  res.status(200).json({
    image: image
      ? `/api/place-image?raw=1&v=4&url=${encodeURIComponent(placeUrl)}`
      : null,
  })
}
