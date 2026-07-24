import dummyWines from '../../dummy data/wines.json'
import { WINE_TYPE_BG_COLOR, type WineType } from './todayPickData'

const wineImages = import.meta.glob('../assets/images/wines/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export type DummyWine = {
  id: string
  nameKo: string
  type: WineType
  country: string
  region: string
  grape: string
  price: number
  rating: number
  imageUrl: string
}

export type Wine = {
  id: string
  name: string
  region: string
  regionTextSize: string
  price: string
  priceValue: number
  rating: string
  image: string
  bgColor: string
  type: WineType
  country: string
  grape: string
}

export const dummyWineData = dummyWines as DummyWine[]

export function getRegionText(wine: DummyWine): string {
  const subRegion = wine.region.startsWith(wine.country)
    ? wine.region.slice(wine.country.length).trim()
    : wine.region
  return subRegion ? `${wine.country} · ${subRegion} · ${wine.grape}` : `${wine.country} · ${wine.grape}`
}

export function toListWine(wine: DummyWine): Wine {
  const regionText = getRegionText(wine)
  const fileName = wine.imageUrl.split('/').pop() ?? ''

  return {
    id: wine.id,
    name: wine.nameKo,
    region: regionText,
    regionTextSize: regionText.length > 18 ? 'text-[11px]' : 'text-[12px]',
    price: `₩${wine.price.toLocaleString()}`,
    priceValue: wine.price,
    rating: wine.rating.toFixed(1),
    image: wineImages[`../assets/images/wines/${fileName}`] ?? '',
    bgColor: WINE_TYPE_BG_COLOR[wine.type],
    type: wine.type,
    country: wine.country,
    grape: wine.grape,
  }
}

export function getWineById(id: string): Wine | undefined {
  const found = dummyWineData.find((wine) => wine.id === id)
  return found ? toListWine(found) : undefined
}
