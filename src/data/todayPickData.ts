export type WineType = 'red' | 'white' | 'rose' | 'sparkling'

export const TODAY_PICK_WINE_IDS: Record<WineType, readonly string[]> = {
  red: ['wine_108', 'wine_109'],
  white: ['wine_107', 'wine_022'],
  rose: ['wine_061', 'wine_063'],
  sparkling: ['wine_041', 'wine_042'],
}

export const WINE_TYPE_BG_COLOR: Record<WineType, string> = {
  red: '#831317',
  white: '#ece4a2',
  rose: '#E8A9A0',
  sparkling: '#F2E9C9',
}
