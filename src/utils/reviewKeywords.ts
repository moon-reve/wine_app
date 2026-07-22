type Review = {
  wineId: string
  content: string
  createdAt: string
}

type KeywordRule = {
  label: string
  patterns: RegExp[]
}

const keywordRules: KeywordRule[] = [
  { label: '해산물 페어링', patterns: [/굴/, /해산물/, /생선/, /회(?:와|랑|하고|에|를|가)/] },
  { label: '스테이크 페어링', patterns: [/스테이크/, /채끝/, /소고기/] },
  { label: '미네랄감', patterns: [/미네랄/] },
  { label: '깔끔한 산미', patterns: [/깔끔.{0,12}산미/, /산미.{0,12}깔끔/] },
  { label: '산뜻한 산미', patterns: [/산미/, /상큼/, /산뜻/] },
  { label: '과일향', patterns: [/과일향/, /과실향/, /열대과일/, /복숭아향/, /블랙체리/] },
  { label: '오크향', patterns: [/오크향/, /오크 풍미/] },
  { label: '부드러운 탄닌', patterns: [/부드럽.{0,12}탄닌/, /탄닌.{0,12}부드럽/] },
  { label: '부드러움', patterns: [/부드럽/, /벨벳/] },
  { label: '풍부한 향', patterns: [/향.{0,8}풍부/, /풍부.{0,8}향/] },
  { label: '드라이', patterns: [/드라이/] },
  { label: '달콤함', patterns: [/달콤/, /달달/, /달큰/, /스위트/] },
  { label: '가성비', patterns: [/가성비/, /가격 대비/, /가격 생각/] },
  { label: '홈파티', patterns: [/홈파티/, /파티/] },
  { label: '선물용', patterns: [/선물/] },
  { label: '긴 여운', patterns: [/여운.{0,8}길/, /끝맛/] },
  { label: '좋은 밸런스', patterns: [/밸런스/, /균형/] },
  { label: '입문자 추천', patterns: [/입문자/, /입문용/] },
]

export function getFrequentReviewKeywords(reviews: Review[], wineId: string, limit = 4) {
  const keywordStats = new Map<string, { count: number; lastMentionedAt: number }>()

  reviews
    .filter((review) => review.wineId === wineId)
    .forEach((review) => {
      const mentionedAt = Date.parse(review.createdAt)

      keywordRules.forEach(({ label, patterns }) => {
        if (!patterns.some((pattern) => pattern.test(review.content))) return

        const current = keywordStats.get(label)
        keywordStats.set(label, {
          count: (current?.count ?? 0) + 1,
          lastMentionedAt: Math.max(current?.lastMentionedAt ?? 0, mentionedAt),
        })
      })
    })

  return [...keywordStats.entries()]
    .sort(([labelA, statsA], [labelB, statsB]) => {
      if (statsA.count !== statsB.count) return statsB.count - statsA.count
      if (statsA.lastMentionedAt !== statsB.lastMentionedAt) {
        return statsB.lastMentionedAt - statsA.lastMentionedAt
      }
      return labelA.localeCompare(labelB, 'ko')
    })
    .slice(0, limit)
    .map(([label]) => label)
}
