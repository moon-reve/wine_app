const ALLOWED_HOSTNAMES = new Set(['place.map.kakao.com'])
const OG_IMAGE_PATTERN =
  /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']|<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
// 등록된 사진이 없는 매장은 og:image가 실제 사진 대신 핀이 찍힌
// 정적 지도 썸네일(staticmap.kakao.com)로 내려오는데, 이건 "사진 있음"으로 취급하지 않는다.
const STATIC_MAP_HOSTNAME = 'staticmap.kakao.com'
const ALLOWED_IMAGE_HOST_SUFFIXES = ['.kakaocdn.net', '.daumcdn.net', '.kakao.com']
const MAX_IMAGE_BYTES = 10 * 1024 * 1024

export type PlaceImageAsset = {
  body: Uint8Array
  contentType: string
}

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

export async function fetchPlaceImageAsset(placeUrl: string): Promise<PlaceImageAsset | null> {
  const imageUrl = await fetchPlaceOgImage(placeUrl)
  if (!imageUrl) return null

  let target: URL
  try {
    target = new URL(imageUrl)
  } catch {
    return null
  }

  const isAllowedHost = ALLOWED_IMAGE_HOST_SUFFIXES.some(
    (suffix) => target.hostname === suffix.slice(1) || target.hostname.endsWith(suffix),
  )
  if (target.protocol !== 'https:' || !isAllowedHost) return null

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 7000)

  try {
    const response = await fetch(target, {
      signal: controller.signal,
      headers: {
        Accept: 'image/webp,image/jpeg,image/png,image/*;q=0.8,*/*;q=0.5',
        Referer: placeUrl,
        'User-Agent': 'Mozilla/5.0 (compatible; WineAppBot/1.0)',
      },
    })
    if (!response.ok) return null

    const contentType = response.headers.get('content-type')?.split(';')[0].trim() ?? ''
    if (!contentType.startsWith('image/')) return null

    const contentLength = Number(response.headers.get('content-length') ?? 0)
    if (contentLength > MAX_IMAGE_BYTES) return null

    const body = new Uint8Array(await response.arrayBuffer())
    if (body.byteLength === 0 || body.byteLength > MAX_IMAGE_BYTES) return null

    return { body, contentType }
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}
