import { fetchPlaceOgImage } from './_lib/placeImage'

type ApiRequest = { query: Record<string, string | string[] | undefined> }
type ApiResponse = {
  status: (code: number) => ApiResponse
  setHeader: (name: string, value: string) => void
  json: (body: unknown) => void
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const rawUrl = req.query.url
  const placeUrl = Array.isArray(rawUrl) ? rawUrl[0] : rawUrl

  if (!placeUrl) {
    res.status(400).json({ image: null })
    return
  }

  const image = await fetchPlaceOgImage(placeUrl)
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
  res.status(200).json({ image })
}
