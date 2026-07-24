const ALLOWED_HOSTNAMES = new Set(['place.map.kakao.com'])
const OG_IMAGE_PATTERN =
  /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']|<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
// 등록된 사진이 없는 매장은 og:image가 실제 사진 대신 핀이 찍힌
// 정적 지도 썸네일(staticmap.kakao.com)로 내려오는데, 이건 "사진 있음"으로 취급하지 않는다.
const STATIC_MAP_HOSTNAME = 'staticmap.kakao.com'

export async function fetchPlaceOgImage(placeUrl: string): Promise<string | null> {
  let target: URL
  try {
    target = new URL(placeUrl)
  } catch {
    return null
  }

  if (!ALLOWED_HOSTNAMES.has(target.hostname)) return null

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 4000)

  try {
    const response = await fetch(target, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WineAppBot/1.0)' },
    })
    if (!response.ok) return null

    const html = await response.text()
    const match = html.match(OG_IMAGE_PATTERN)
    const imageUrl = match?.[1] ?? match?.[2] ?? null
    if (!imageUrl) return null

    const imageHostname = new URL(imageUrl, target).hostname
    if (imageHostname === STATIC_MAP_HOSTNAME) return null

    return imageUrl
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}
