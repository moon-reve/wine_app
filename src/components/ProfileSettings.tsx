import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from './BottomNav'
import wine015Image from '../assets/images/wines/wine_015.png'
import wine018Image from '../assets/images/wines/wine_018.png'
import wine019Image from '../assets/images/wines/wine_019.png'
import winesData from '../../dummy data/wines.json'

const STORAGE_KEY = 'wine-app-profile-settings'

type BucketWine = {
  id: string
  name: string
  tag: string
  image: string
}

type WineRecord = {
  id: string
  nameKo: string
  nameEn: string
  country: string
  grape: string
}

type ProfileSettingsData = {
  nickname: string
  bio: string
  profileImage: string
  wineLevel: string
  wineTendency: string
  todayTaste: string
  preferredPairings: string[]
  interests: string[]
  activityArea: string
  visibility: 'public' | 'followers' | 'private'
  instagram: string
  socialUrl: string
  birthday: string
  priceRange: number
  bucketWines: BucketWine[]
  representativeWineName: string
  representativeWineCaption: string
  representativeWineId: string
  regionGroup: keyof typeof regionOptions
  district: string
  region: string
  wineStyles: string[]
  customWineStyles: string[]
  isPublic: boolean
}

const initialProfile: ProfileSettingsData = {
  nickname: '와인러버_김민우',
  bio: '“인생의 쓴맛보다 와인의 쓴맛을 아는 사람”',
  profileImage: '',
  wineLevel: '와인 러버',
  wineTendency: '🍒 과일파',
  todayTaste: '레드',
  preferredPairings: ['🥩 스테이크', '🧀 치즈'],
  interests: ['🍷 와인바', '✈️ 여행'],
  activityArea: '성수',
  visibility: 'public',
  instagram: '',
  socialUrl: '',
  birthday: '',
  priceRange: 1,
  bucketWines: [
    { id: 'wine_018', name: '샤토 마고', tag: '#보르도', image: wine018Image },
    { id: 'wine_019', name: '오퍼스 원', tag: '#나파밸리', image: wine019Image },
    { id: 'wine_015', name: '사시카이아', tag: '#슈퍼투스칸', image: wine015Image },
  ],
  representativeWineName: '몬테스 퍼플 엔젤',
  representativeWineCaption: '나를 닮은 와인',
  representativeWineId: 'wine_003',
  regionGroup: '서울특별시',
  district: '강남구',
  region: '서울특별시 강남구',
  wineStyles: ['#레드와인', '#바디감무겁게', '#가성비와인'],
  customWineStyles: [],
  isPublic: true,
}

const regionOptions = {
  서울특별시: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
  경기도: ['고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '여주시', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시', '가평군', '양평군', '연천군'],
  강원도: ['강릉시', '동해시', '삼척시', '속초시', '원주시', '춘천시', '태백시', '고성군', '양구군', '양양군', '영월군', '인제군', '정선군', '철원군', '평창군', '홍천군', '화천군', '횡성군'],
  경상도: ['부산광역시', '대구광역시', '울산광역시', '창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시', '포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '울릉도', '독도'],
  전라도: ['광주광역시', '전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '고흥군', '화순군', '해남군', '영암군', '무안군', '완도군'],
  제주도: ['제주시', '서귀포시'],
  해외: ['미국', '캐나다', '일본', '중국', '홍콩', '대만', '싱가포르', '프랑스', '이탈리아', '스페인', '독일', '영국', '포르투갈', '호주', '뉴질랜드', '칠레', '아르헨티나', '남아프리카공화국'],
} as const

const wineLevelOptions = ['와인 입문자', '취미로 즐겨요', '와인 러버', '소믈리에 준비중', '전문가', '이제 시작해요', '가볍게 즐겨요', '취향을 찾는 중', '꽤 많이 알아요']
const wineTendencyOptions = ['🍒 과일파', '🌿 허브파', '🍫 묵직파', '🥂 산뜻파', '🍯 달콤파']
const todayTasteOptions = ['레드', '화이트', '스파클링', '내추럴']
const pairingOptions = ['🥩 스테이크', '🍕 피자', '🍣 회', '🧀 치즈', '🍰 디저트', '🌮 멕시칸', '🍝 파스타']
const interestOptions = ['🍷 와인바', '📷 사진', '✈️ 여행', '🎵 음악', '📚 독서', '🎬 영화']
const activityAreaOptions = ['성수', '한남', '압구정', '판교', '연남', '청담', '을지로', '해운대']
const priceRangeOptions = ['2만원 이하', '2~5만원', '5~10만원', '10만원 이상']
const wineImageModules = import.meta.glob('../assets/images/wines/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>
const representativeWineOptions = (winesData as WineRecord[]).map((wine) => ({
  ...wine,
  image: wineImageModules[`../assets/images/wines/${wine.id}.png`] ?? '',
}))

const recommendedWineStyles = [
  '#레드와인', '#화이트와인', '#로제와인', '#스파클링', '#내추럴와인',
  '#드라이와인', '#스위트와인', '#가성비와인', '#프리미엄와인', '#데일리와인',
  '#바디감가볍게', '#바디감중간', '#바디감무겁게', '#산미높게', '#산미낮게',
  '#타닌풍부', '#과일향', '#꽃향', '#오크향', '#푸드페어링',
]

const additionalWineStyleSuggestions = [
  '#피노누아', '#카베르네소비뇽', '#메를로', '#쉬라', '#말벡', '#산지오베제',
  '#샤르도네', '#소비뇽블랑', '#리슬링', '#모스카토', '#샴페인', '#오렌지와인',
  '#유기농와인', '#비건와인', '#올드월드와인', '#뉴월드와인', '#프랑스와인',
  '#이탈리아와인', '#스페인와인', '#칠레와인', '#미국와인', '#호주와인',
  '#향신료향', '#초콜릿향', '#베리향', '#시트러스향', '#미네랄리티',
  '#해산물페어링', '#치즈페어링', '#스테이크페어링',
]

type ProfileEmojiOption = {
  id: string
  label: string
  background: string
  symbol?: string
  wineColor?: string
  customIcon?: 'blueberry' | 'olive' | 'rainbow-heart' | 'steak' | 'shrimp'
}

const profileEmojiGroups: { title: string; options: ProfileEmojiOption[] }[] = [
  {
    title: '와인',
    options: [
      { id: 'wine-red', label: '레드 와인', wineColor: '#8f1720', background: '#f8e9ea' },
      { id: 'wine-white', label: '화이트 와인', wineColor: '#e0c46b', background: '#fbf6e5' },
      { id: 'wine-rose', label: '로제 와인', wineColor: '#e58da0', background: '#fcecef' },
      { id: 'wine-sparkling', label: '스파클링 와인', wineColor: '#f0d977', background: '#fff9df' },
      { id: 'wine-burgundy', label: '버건디 와인', wineColor: '#5d1020', background: '#f4e8ec' },
      { id: 'wine-orange', label: '오렌지 와인', wineColor: '#e17b31', background: '#fff0e4' },
      { id: 'wine-dessert', label: '디저트 와인', wineColor: '#bd7d22', background: '#f8efdc' },
      { id: 'wine-ice', label: '아이스 와인', wineColor: '#f4e4a1', background: '#eaf6fa' },
    ],
  },
  {
    title: '컬러 하트',
    options: [
      { id: 'heart-red', label: '빨간 하트', symbol: '❤️', background: '#fff0f1' },
      { id: 'heart-orange', label: '주황 하트', symbol: '🧡', background: '#fff4e9' },
      { id: 'heart-yellow', label: '노란 하트', symbol: '💛', background: '#fffbe7' },
      { id: 'heart-green', label: '초록 하트', symbol: '💚', background: '#eef9ee' },
      { id: 'heart-blue', label: '파란 하트', symbol: '💙', background: '#eef5ff' },
      { id: 'heart-purple', label: '보라 하트', symbol: '💜', background: '#f6efff' },
      { id: 'heart-rainbow', label: '무지개 하트', customIcon: 'rainbow-heart', background: '#f7f3ff' },
    ],
  },
  {
    title: '과일 · 베리',
    options: [
      { id: 'fruit-grape', label: '포도', symbol: '🍇', background: '#f6effa' },
      { id: 'fruit-strawberry', label: '딸기', symbol: '🍓', background: '#fff0f1' },
      { id: 'fruit-cherry', label: '체리', symbol: '🍒', background: '#fcecee' },
      { id: 'fruit-blueberry', label: '블루베리', customIcon: 'blueberry', background: '#eef0fa' },
      { id: 'fruit-peach', label: '복숭아', symbol: '🍑', background: '#fff2eb' },
      { id: 'fruit-lemon', label: '레몬', symbol: '🍋', background: '#fffbe3' },
      { id: 'fruit-apple', label: '사과', symbol: '🍎', background: '#fff0f0' },
    ],
  },
  {
    title: '와인 페어링',
    options: [
      { id: 'pairing-cheese', label: '치즈', symbol: '🧀', background: '#fff8df' },
      { id: 'pairing-olive', label: '올리브', customIcon: 'olive', background: '#f1f6e9' },
      { id: 'pairing-bread', label: '바게트', symbol: '🥖', background: '#faf1e5' },
      { id: 'pairing-steak', label: '스테이크', customIcon: 'steak', background: '#f9e9e7' },
      { id: 'pairing-shrimp', label: '새우', customIcon: 'shrimp', background: '#fff0e9' },
    ],
  },
  {
    title: '캐릭터',
    options: [
      { id: 'character-woman', label: '여성', symbol: '👩', background: '#fff1f4' },
      { id: 'character-man', label: '남성', symbol: '👨', background: '#eef5ff' },
      { id: 'character-middle-woman', label: '아줌마', symbol: '👩‍🦱', background: '#fff4ec' },
      { id: 'character-middle-man', label: '아저씨', symbol: '👨‍🦱', background: '#f1f5ef' },
      { id: 'character-grandmother', label: '할머니', symbol: '👵', background: '#f7efff' },
      { id: 'character-grandfather', label: '할아버지', symbol: '👴', background: '#f3f1ed' },
    ],
  },
]

const profileEmojiOptions = profileEmojiGroups.flatMap((group) => group.options)

function readSavedProfile(): ProfileSettingsData {
  try {
    const savedProfile = window.localStorage.getItem(STORAGE_KEY)
    if (!savedProfile) return initialProfile

    const parsedProfile = JSON.parse(savedProfile) as Partial<ProfileSettingsData>
    const savedWineStyles = parsedProfile.wineStyles ?? initialProfile.wineStyles
    const customWineStyles = parsedProfile.customWineStyles
      ?? savedWineStyles.filter((style) => !recommendedWineStyles.includes(style))
    const legacyEmoji = profileEmojiOptions.find((option) => option.symbol === parsedProfile.profileImage)
    const profileImage = legacyEmoji ? `emoji:${legacyEmoji.id}` : (parsedProfile.profileImage ?? '')
    const visibility = parsedProfile.visibility ?? (parsedProfile.isPublic === false ? 'private' : 'public')
    const representativeWineId = parsedProfile.representativeWineId ?? initialProfile.representativeWineId
    const isCustomRepresentativeWine = representativeWineId === 'custom'
    const representativeWine = representativeWineOptions.find((wine) => wine.id === representativeWineId)
      ?? representativeWineOptions[2]
    const savedBucketWines = parsedProfile.bucketWines?.length
      ? parsedProfile.bucketWines
      : initialProfile.bucketWines
    const bucketWines = savedBucketWines.map((wine) => {
      if (wine.id === 'romanee-conti' || wine.id === 'wine_018') return initialProfile.bucketWines[0]
      if (wine.id === 'opus-one' || wine.id === 'wine_019') return initialProfile.bucketWines[1]
      if (wine.id === 'sassicaia' || wine.id === 'wine_015') return initialProfile.bucketWines[2]
      return wine
    })
    const nickname = parsedProfile.nickname === 'ㅁㄴㅇㄹ호ㅓㅏㅣ'
      ? initialProfile.nickname
      : (parsedProfile.nickname ?? initialProfile.nickname)
    const bio = parsedProfile.bio === 'ㄴㅇㄹ호ㅓ'
      ? initialProfile.bio
      : (parsedProfile.bio ?? initialProfile.bio)

    return {
      ...initialProfile,
      ...parsedProfile,
      profileImage,
      customWineStyles,
      visibility,
      isPublic: visibility !== 'private',
      representativeWineId: isCustomRepresentativeWine ? 'custom' : representativeWine.id,
      representativeWineName: isCustomRepresentativeWine
        ? (parsedProfile.representativeWineName || '직접 입력 와인')
        : representativeWine.nameKo,
      bucketWines,
      nickname,
      bio,
    }
  } catch {
    return initialProfile
  }
}

export default function ProfileSettings() {
  const navigate = useNavigate()
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const albumInputRef = useRef<HTMLInputElement>(null)
  const bucketImageInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cameraStreamRef = useRef<MediaStream | null>(null)
  const editorCropRef = useRef<HTMLDivElement>(null)
  const editorPointersRef = useRef(new Map<number, { x: number; y: number }>())
  const pinchStartRef = useRef<{ distance: number; zoom: number } | null>(null)
  const [profile, setProfile] = useState<ProfileSettingsData>(readSavedProfile)
  const [saved, setSaved] = useState(false)
  const [isStylePickerOpen, setIsStylePickerOpen] = useState(false)
  const [isStyleSaveConfirmOpen, setIsStyleSaveConfirmOpen] = useState(false)
  const [isPhotoMenuOpen, setIsPhotoMenuOpen] = useState(false)
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false)
  const [isPhotoApplyConfirmOpen, setIsPhotoApplyConfirmOpen] = useState(false)
  const [photoSaved, setPhotoSaved] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('user')
  const [cameraError, setCameraError] = useState('')
  const [editorImage, setEditorImage] = useState('')
  const [cropZoom, setCropZoom] = useState(1)
  const [cropX, setCropX] = useState(0)
  const [cropY, setCropY] = useState(0)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [skinSmoothing, setSkinSmoothing] = useState(0)
  const [isProfilePreviewOpen, setIsProfilePreviewOpen] = useState(false)
  const [isWineLevelOpen, setIsWineLevelOpen] = useState(false)
  const [isWinePreferenceOpen, setIsWinePreferenceOpen] = useState(false)
  const [isPairingOpen, setIsPairingOpen] = useState(false)
  const [isInterestOpen, setIsInterestOpen] = useState(false)
  const [isActivityAreaOpen, setIsActivityAreaOpen] = useState(false)
  const [isSocialOpen, setIsSocialOpen] = useState(false)
  const [isBucketListOpen, setIsBucketListOpen] = useState(false)
  const [bucketDraft, setBucketDraft] = useState({ name: '', tag: '', image: '' })
  const [representativeWineQuery, setRepresentativeWineQuery] = useState(profile.representativeWineName)
  const [isRepresentativeSearchOpen, setIsRepresentativeSearchOpen] = useState(false)
  const [customStyle, setCustomStyle] = useState('')
  const availableWineStyles = [
    ...profile.customWineStyles,
    ...recommendedWineStyles.filter((style) => !profile.customWineStyles.includes(style)),
  ]
  const styleSearchQuery = customStyle.trim().replace(/^#/, '').toLocaleLowerCase('ko-KR')
  const filteredStyleSuggestions = styleSearchQuery
    ? additionalWineStyleSuggestions
        .filter((style) => !profile.wineStyles.includes(style))
        .filter((style) => style.toLocaleLowerCase('ko-KR').includes(styleSearchQuery))
        .slice(0, 6)
    : []
  const representativeWine = profile.representativeWineId === 'custom'
    ? null
    : representativeWineOptions.find((wine) => wine.id === profile.representativeWineId)
      ?? representativeWineOptions[2]
  const normalizedRepresentativeQuery = representativeWineQuery.trim().toLocaleLowerCase('ko-KR')
  const filteredRepresentativeWines = normalizedRepresentativeQuery
    ? representativeWineOptions
        .filter((wine) => `${wine.nameKo} ${wine.nameEn}`.toLocaleLowerCase('ko-KR').includes(normalizedRepresentativeQuery))
        .slice(0, 8)
    : []

  useEffect(() => {
    if (!saved) return

    const timer = window.setTimeout(() => setSaved(false), 2200)
    return () => window.clearTimeout(timer)
  }, [saved])

  useEffect(() => {
    if (!photoSaved) return

    const timer = window.setTimeout(() => setPhotoSaved(false), 2400)
    return () => window.clearTimeout(timer)
  }, [photoSaved])

  useEffect(() => {
    if (!isCameraOpen) return

    let cancelled = false
    setCameraError('')

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('이 브라우저에서는 카메라 미리보기를 지원하지 않습니다.')
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: cameraFacingMode },
        })

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        cameraStreamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
      } catch (error) {
        setCameraError(error instanceof Error ? error.message : '카메라를 실행할 수 없습니다.')
      }
    }

    void startCamera()

    return () => {
      cancelled = true
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop())
      cameraStreamRef.current = null
    }
  }, [isCameraOpen, cameraFacingMode])

  const updateProfile = <Key extends keyof ProfileSettingsData>(
    key: Key,
    value: ProfileSettingsData[Key],
  ) => {
    setProfile((current) => ({ ...current, [key]: value }))
    setSaved(false)
  }

  const toggleProfileListItem = (
    key: 'preferredPairings' | 'interests',
    item: string,
  ) => {
    setProfile((current) => ({
      ...current,
      [key]: current[key].includes(item)
        ? current[key].filter((currentItem) => currentItem !== item)
        : [...current[key], item],
    }))
    setSaved(false)
  }

  const handleVisibilityChange = (visibility: ProfileSettingsData['visibility']) => {
    setProfile((current) => ({
      ...current,
      visibility,
      isPublic: visibility !== 'private',
    }))
    setSaved(false)
  }

  const handleRepresentativeWineChange = (wineId: string) => {
    const wine = representativeWineOptions.find((option) => option.id === wineId)
    if (!wine) return

    setProfile((current) => ({
      ...current,
      representativeWineId: wine.id,
      representativeWineName: wine.nameKo,
    }))
    setRepresentativeWineQuery(wine.nameKo)
    setIsRepresentativeSearchOpen(false)
    setSaved(false)
  }

  const handleUseCustomRepresentativeWine = () => {
    const wineName = representativeWineQuery.trim()
    if (!wineName) return

    setProfile((current) => ({
      ...current,
      representativeWineId: 'custom',
      representativeWineName: wineName,
    }))
    setIsRepresentativeSearchOpen(false)
    setSaved(false)
  }

  const handleBucketImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setBucketDraft((current) => ({ ...current, image: String(reader.result ?? '') }))
      event.target.value = ''
    }
    reader.readAsDataURL(file)
  }

  const handleAddBucketWine = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = bucketDraft.name.trim()
    if (!name) return

    const tagText = bucketDraft.tag.trim()
    const tag = tagText ? (tagText.startsWith('#') ? tagText : `#${tagText}`) : '#마셔보고싶어요'
    const bucketWine: BucketWine = {
      id: `${Date.now()}-${name}`,
      name,
      tag,
      image: bucketDraft.image,
    }
    updateProfile('bucketWines', [...profile.bucketWines, bucketWine])
    setBucketDraft({ name: '', tag: '', image: '' })
  }

  const handleSave = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    window.dispatchEvent(new CustomEvent('profile-settings-saved', { detail: profile }))
    setIsSaveConfirmOpen(false)
    setSaved(true)
  }

  const handleBack = () => {
    const historyIndex = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (historyIndex > 0) {
      navigate(-1)
      return
    }

    navigate('/')
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      openPhotoEditor(String(reader.result ?? ''))
      setIsPhotoMenuOpen(false)
      event.target.value = ''
    }
    reader.readAsDataURL(file)
  }

  const openPhotoEditor = (imageSource: string) => {
    setEditorImage(imageSource)
    setCropZoom(1)
    setCropX(0)
    setCropY(0)
    setBrightness(100)
    setContrast(100)
    setSkinSmoothing(0)
  }

  const handleOpenCamera = () => {
    setIsPhotoMenuOpen(false)
    setCameraError('')
    setIsCameraOpen(true)
  }

  const handleCapturePhoto = () => {
    const video = videoRef.current
    if (!video || !video.videoWidth || !video.videoHeight) return

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const context = canvas.getContext('2d')
    if (!context) return

    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    const capturedImage = canvas.toDataURL('image/jpeg', 0.92)
    setIsCameraOpen(false)
    openPhotoEditor(capturedImage)
  }

  const handleApplyEditedImage = () => {
    if (!editorImage) return

    const image = new Image()
    image.onload = () => {
      const sourceSize = Math.min(image.naturalWidth, image.naturalHeight) / cropZoom
      const maxOffsetX = Math.max(0, (image.naturalWidth - sourceSize) / 2)
      const maxOffsetY = Math.max(0, (image.naturalHeight - sourceSize) / 2)
      const sourceX = (image.naturalWidth - sourceSize) / 2 + (cropX / 100) * maxOffsetX
      const sourceY = (image.naturalHeight - sourceSize) / 2 + (cropY / 100) * maxOffsetY
      const canvas = document.createElement('canvas')
      const filteredCanvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      filteredCanvas.width = 512
      filteredCanvas.height = 512
      const context = canvas.getContext('2d')
      const filteredContext = filteredCanvas.getContext('2d')
      if (!context || !filteredContext) return

      filteredContext.filter = `brightness(${brightness}%) contrast(${contrast}%)`
      filteredContext.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, 512, 512)
      context.drawImage(filteredCanvas, 0, 0)
      if (skinSmoothing > 0) {
        context.save()
        context.globalAlpha = Math.min(0.38, skinSmoothing / 260)
        context.filter = `blur(${0.5 + skinSmoothing / 32}px)`
        context.drawImage(filteredCanvas, 0, 0)
        context.restore()
      }
      const profileImage = canvas.toDataURL('image/jpeg', 0.86)
      const updatedProfile = { ...profile, profileImage }
      setProfile(updatedProfile)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile))
      window.dispatchEvent(new CustomEvent('profile-settings-saved', { detail: updatedProfile }))
      setIsPhotoApplyConfirmOpen(false)
      setEditorImage('')
      setPhotoSaved(true)
    }
    image.src = editorImage
  }

  const clampCropPosition = (value: number) => Math.max(-100, Math.min(100, value))
  const clampZoom = (value: number) => Math.max(1, Math.min(3, value))

  const handleEditorPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    editorPointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (editorPointersRef.current.size === 2) {
      const [first, second] = [...editorPointersRef.current.values()]
      pinchStartRef.current = {
        distance: Math.hypot(second.x - first.x, second.y - first.y),
        zoom: cropZoom,
      }
    }
  }

  const handleEditorPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const previousPoint = editorPointersRef.current.get(event.pointerId)
    if (!previousPoint) return

    editorPointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const cropElement = editorCropRef.current
    if (!cropElement) return

    if (editorPointersRef.current.size === 1) {
      const deltaX = event.clientX - previousPoint.x
      const deltaY = event.clientY - previousPoint.y
      const movementScale = 200 / Math.max(1, cropElement.clientWidth) / cropZoom
      setCropX((current) => clampCropPosition(current - deltaX * movementScale))
      setCropY((current) => clampCropPosition(current - deltaY * movementScale))
      return
    }

    if (editorPointersRef.current.size === 2 && pinchStartRef.current) {
      const [first, second] = [...editorPointersRef.current.values()]
      const distance = Math.hypot(second.x - first.x, second.y - first.y)
      setCropZoom(clampZoom(pinchStartRef.current.zoom * distance / Math.max(1, pinchStartRef.current.distance)))
    }
  }

  const handleEditorPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    editorPointersRef.current.delete(event.pointerId)
    pinchStartRef.current = null

    if (editorPointersRef.current.size === 2) {
      const [first, second] = [...editorPointersRef.current.values()]
      pinchStartRef.current = {
        distance: Math.hypot(second.x - first.x, second.y - first.y),
        zoom: cropZoom,
      }
    }
  }

  const handleEditorWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    setCropZoom((current) => clampZoom(current - event.deltaY * 0.002))
  }

  const handleEmojiSelect = (option: ProfileEmojiOption) => {
    updateProfile('profileImage', `emoji:${option.id}`)
    setIsEmojiPickerOpen(false)
    setIsPhotoMenuOpen(false)
  }

  const selectedProfileEmoji = profileEmojiOptions.find(
    (option) => profile.profileImage === `emoji:${option.id}`,
  )

  const handleRegionGroupChange = (regionGroup: keyof typeof regionOptions) => {
    const district = regionOptions[regionGroup][0]
    setProfile((current) => ({
      ...current,
      regionGroup,
      district,
      region: `${regionGroup} ${district}`,
    }))
    setSaved(false)
  }

  const handleDistrictChange = (district: string) => {
    setProfile((current) => ({
      ...current,
      district,
      region: `${current.regionGroup} ${district}`,
    }))
    setSaved(false)
  }

  const toggleWineStyle = (style: string) => {
    const wineStyles = profile.wineStyles.includes(style)
      ? profile.wineStyles.filter((item) => item !== style)
      : [...profile.wineStyles, style]

    updateProfile('wineStyles', wineStyles)
  }

  const addCustomWineStyle = (styleValue: string) => {
    const style = styleValue.trim()
    if (!style) return

    const formattedStyle = style.startsWith('#') ? style : `#${style}`
    setProfile((current) => ({
      ...current,
      customWineStyles: current.customWineStyles.includes(formattedStyle)
        ? current.customWineStyles
        : [formattedStyle, ...current.customWineStyles],
      wineStyles: current.wineStyles.includes(formattedStyle)
        ? current.wineStyles
        : [...current.wineStyles, formattedStyle],
    }))
    setSaved(false)
    setCustomStyle('')
  }

  const handleAddCustomStyle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addCustomWineStyle(customStyle)
  }

  const handleConfirmWineStyleSelection = () => {
    const savedProfile = readSavedProfile()
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...savedProfile,
      wineStyles: profile.wineStyles,
      customWineStyles: profile.customWineStyles,
    }))
    setIsStyleSaveConfirmOpen(false)
    setIsStylePickerOpen(false)
  }

  const handleNav = (label: string) => {
    if (label === '홈') navigate('/')
    if (label === '리스트') navigate('/list')
    if (label === '라운지') navigate('/lounge')
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-white pb-32 text-[#171717]">
      <header className="relative flex h-[70px] items-center justify-center px-5">
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={handleBack}
          className="absolute left-5 flex size-9 items-center justify-start rounded-lg text-[#98151b] focus-visible:outline-2 focus-visible:outline-[#98151b]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none">
            <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-[19px] font-bold tracking-[-0.5px] text-[#98151b]">프로필 수정</h1>
        <button
          type="button"
          onClick={() => setIsSaveConfirmOpen(true)}
          className="absolute right-5 rounded-lg px-1 py-2 text-[16px] font-semibold text-[#98151b] focus-visible:outline-2 focus-visible:outline-[#98151b]"
        >
          저장
        </button>
      </header>

      <main className="px-5 pt-8">
        <section aria-labelledby="profile-settings-heading">
          <h2
            id="profile-settings-heading"
            className="font-playfair-display text-[29px] leading-[1.15] font-bold tracking-[-0.8px] text-[#98151b]"
          >
            Profile Settings
          </h2>
          <p className="mt-2 text-[14px] tracking-[-0.35px] text-[#2e2e2e]">
            나를 표현하는 프로필과 와인 취향을 관리하세요.
          </p>

          <div className="mt-8 flex flex-col items-center">
            <button
              type="button"
              aria-label="프로필 사진 선택"
              onClick={() => setIsPhotoMenuOpen(true)}
              className="flex size-[76px] items-center justify-center overflow-hidden rounded-full bg-[#faf8f7] text-[#98151b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98151b]"
            >
              {selectedProfileEmoji ? (
                <span
                  role="img"
                  aria-label={`선택한 프로필 ${selectedProfileEmoji.label}`}
                  className="flex size-full items-center justify-center"
                  style={{ backgroundColor: selectedProfileEmoji.background }}
                >
                  <ProfileEmojiIcon option={selectedProfileEmoji} large />
                </span>
              ) : profile.profileImage ? (
                <img src={profile.profileImage} alt="선택한 프로필" className="size-full object-cover" />
              ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none">
                  <path d="M7.5 6.5 9 4.5h6l1.5 2H19A2.5 2.5 0 0 1 21.5 9v8A2.5 2.5 0 0 1 19 19.5H5A2.5 2.5 0 0 1 2.5 17V9A2.5 2.5 0 0 1 5 6.5h2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )}
            </button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleImageChange}
            />
            <input
              ref={albumInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={() => setIsPhotoMenuOpen(true)}
              className="mt-4 text-[13px] font-semibold text-[#98151b]"
            >
              프로필 사진 변경
            </button>
          </div>
        </section>

        <section className="mt-7 space-y-4" aria-label="기본 프로필 정보">
          <label className="block">
            <span className="mb-2 block text-[14px] font-bold">닉네임</span>
            <span className="relative block">
              <input
                type="text"
                value={profile.nickname}
                maxLength={20}
                onChange={(event) => updateProfile('nickname', event.target.value)}
                className="h-[50px] w-full rounded-[11px] border border-[#d7d7d7] bg-white px-4 pr-15 text-[14px] outline-none transition focus:border-[#98151b] focus:ring-1 focus:ring-[#98151b]"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#999]">
                {profile.nickname.length}/20
              </span>
            </span>
          </label>

          <section className="overflow-hidden rounded-[14px] border border-[#ebe5e5] bg-[#faf8f7]">
            <button
              type="button"
              aria-expanded={isWineLevelOpen}
              aria-controls="wine-level-options"
              onClick={() => setIsWineLevelOpen((open) => !open)}
              className="flex min-h-[62px] w-full items-center justify-between gap-3 px-4 text-left"
            >
              <span>
                <span className="block text-[14px] font-bold">와인 레벨</span>
                <span className="mt-1 block text-[12px] font-medium text-[#98151b]">🍷 {profile.wineLevel}</span>
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className={`size-5 shrink-0 text-[#98151b] transition-transform duration-200 ${isWineLevelOpen ? 'rotate-180' : ''}`}
                fill="none"
              >
                <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isWineLevelOpen && (
              <div id="wine-level-options" className="border-t border-[#ebe5e5] px-4 pt-4 pb-4">
                <p className="mb-3 text-[11px] text-[#858585]">현재 나와 가장 가까운 와인 레벨을 선택하세요.</p>
                <div className="flex flex-wrap gap-2">
                  {wineLevelOptions.map((level) => (
                    <button
                      key={level}
                      type="button"
                      aria-pressed={profile.wineLevel === level}
                      onClick={() => {
                        updateProfile('wineLevel', level)
                        setIsWineLevelOpen(false)
                      }}
                      className={`h-9 rounded-full border px-3 text-[12px] font-medium transition ${profile.wineLevel === level ? 'border-[#98151b] bg-[#98151b] text-white' : 'border-[#dedede] bg-white text-[#595959]'}`}
                    >
                      🍷 {level}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="overflow-hidden rounded-[14px] border border-[#ebe5e5] bg-[#faf8f7]">
            <button
              type="button"
              aria-expanded={isWinePreferenceOpen}
              aria-controls="wine-preference-options"
              onClick={() => setIsWinePreferenceOpen((open) => !open)}
              className="flex min-h-[68px] w-full items-center justify-between gap-3 px-4 text-left"
            >
              <span className="min-w-0">
                <span className="block text-[14px] font-bold">와인 성향 · 오늘의 취향</span>
                <span className="mt-1 block truncate text-[12px] font-medium text-[#98151b]">{profile.wineTendency} · {profile.todayTaste}</span>
              </span>
              <svg aria-hidden="true" viewBox="0 0 20 20" className={`size-5 shrink-0 text-[#98151b] transition-transform duration-200 ${isWinePreferenceOpen ? 'rotate-180' : ''}`} fill="none">
                <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isWinePreferenceOpen && (
              <div id="wine-preference-options" className="border-t border-[#ebe5e5] px-4 pt-4 pb-4">
                <p className="text-[12px] font-bold text-[#595959]">와인 성향</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {wineTendencyOptions.map((tendency) => (
                    <ChoiceChip key={tendency} label={tendency} selected={profile.wineTendency === tendency} onClick={() => updateProfile('wineTendency', tendency)} />
                  ))}
                </div>
                <p className="mt-5 text-[12px] font-bold text-[#595959]">오늘의 취향</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {todayTasteOptions.map((taste) => (
                    <button
                      key={taste}
                      type="button"
                      aria-pressed={profile.todayTaste === taste}
                      onClick={() => updateProfile('todayTaste', taste)}
                      className={`flex h-10 items-center rounded-[10px] border px-3 text-[12px] font-medium ${profile.todayTaste === taste ? 'border-[#98151b] bg-[#fff5f5] text-[#98151b]' : 'border-[#dedede] bg-white text-[#595959]'}`}
                    >
                      <span className={`mr-2 size-3 rounded-full border ${profile.todayTaste === taste ? 'border-[3px] border-[#98151b]' : 'border-[#bdbdbd]'}`} />
                      {taste}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          <label className="block">
            <span className="mb-2 block text-[14px] font-bold">한 줄 소개</span>
            <span className="relative block">
              <textarea
                value={profile.bio}
                maxLength={40}
                rows={3}
                onChange={(event) => updateProfile('bio', event.target.value)}
                className="h-[76px] w-full resize-none rounded-[11px] border border-[#d7d7d7] bg-white px-4 py-3 pr-12 text-[14px] leading-5 outline-none transition focus:border-[#98151b] focus:ring-1 focus:ring-[#98151b]"
              />
              <span className="pointer-events-none absolute right-4 bottom-3 text-[12px] text-[#999]">
                {profile.bio.length}/40
              </span>
            </span>
          </label>

          <fieldset className="block">
            <span className="mb-2 block text-[14px] font-bold">지역</span>
            <div className="grid grid-cols-2 gap-2">
              <label className="relative block">
                <span className="sr-only">지역 선택</span>
                <select
                  value={profile.regionGroup}
                  onChange={(event) => handleRegionGroupChange(event.target.value as keyof typeof regionOptions)}
                  className="h-[50px] w-full appearance-none rounded-[11px] border border-[#d7d7d7] bg-white px-3 pr-9 text-[14px] outline-none focus:border-[#98151b] focus:ring-1 focus:ring-[#98151b]"
                >
                  {Object.keys(regionOptions).map((region) => <option key={region}>{region}</option>)}
                </select>
                <SelectArrow />
              </label>
              <label className="relative block">
                <span className="sr-only">행정구역 선택</span>
                <select
                  value={profile.district}
                  onChange={(event) => handleDistrictChange(event.target.value)}
                  className="h-[50px] w-full appearance-none rounded-[11px] border border-[#d7d7d7] bg-white px-3 pr-9 text-[14px] outline-none focus:border-[#98151b] focus:ring-1 focus:ring-[#98151b]"
                >
                  {regionOptions[profile.regionGroup].map((district) => <option key={district}>{district}</option>)}
                </select>
                <SelectArrow />
              </label>
            </div>
            <div className="mt-2 flex items-center gap-2 rounded-[10px] bg-[#faf8f7] px-3 py-2.5">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 shrink-0 text-[#98151b]" fill="none">
                <path d="M10 18s6-5.08 6-10a6 6 0 1 0-12 0c0 4.92 6 10 6 10Z" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.7" />
              </svg>
              <p className="text-[12px] text-[#737373]">선택 지역 <strong className="ml-1 font-semibold text-[#98151b]">{profile.region}</strong></p>
            </div>
          </fieldset>
        </section>

        <section className="mt-6" aria-labelledby="wine-style-title">
          <h3 id="wine-style-title" className="text-[13px] font-bold">관심 와인 스타일</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.wineStyles.map((style) => (
              <button
                key={style}
                type="button"
                title="클릭하여 삭제"
                onClick={() => updateProfile('wineStyles', profile.wineStyles.filter((item) => item !== style))}
                className="h-8 rounded-full bg-[#a02a2e] px-4 text-[12px] font-medium text-white"
              >
                {style}
              </button>
            ))}
            <button
              type="button"
              aria-label="와인 스타일 추가"
              aria-expanded={isStylePickerOpen}
              onClick={() => setIsStylePickerOpen(true)}
              className="flex h-8 min-w-14 items-center justify-center rounded-full border border-[#d7d7d7] text-[23px] leading-none text-[#98151b]"
            >
              +
            </button>
          </div>
        </section>

        <CollapsibleSection id="pairing" title="선호 페어링" summary={`${profile.preferredPairings.length}개 선택`} open={isPairingOpen} onToggle={() => setIsPairingOpen((open) => !open)}>
          <p className="mt-1 text-[12px] text-[#858585]">와인과 함께 즐기고 싶은 음식을 선택하세요.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {pairingOptions.map((pairing) => (
              <ChoiceChip key={pairing} label={pairing} selected={profile.preferredPairings.includes(pairing)} onClick={() => toggleProfileListItem('preferredPairings', pairing)} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="interest" title="관심사" summary={`${profile.interests.length}개 선택`} open={isInterestOpen} onToggle={() => setIsInterestOpen((open) => !open)}>
          <div className="mt-3 flex flex-wrap gap-2">
            {interestOptions.map((interest) => (
              <ChoiceChip key={interest} label={interest} selected={profile.interests.includes(interest)} onClick={() => toggleProfileListItem('interests', interest)} />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="activity-area" title="자주 가는 지역" summary={profile.activityArea || '미설정'} open={isActivityAreaOpen} onToggle={() => setIsActivityAreaOpen((open) => !open)}>
          <p className="mt-1 text-[12px] text-[#858585]">와인 모임과 커뮤니티 활동을 주로 하는 지역입니다.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {activityAreaOptions.map((area) => (
              <ChoiceChip key={area} label={area} selected={profile.activityArea === area} onClick={() => updateProfile('activityArea', area)} />
            ))}
          </div>
          <input
            type="text"
            value={activityAreaOptions.includes(profile.activityArea) ? '' : profile.activityArea}
            onChange={(event) => updateProfile('activityArea', event.target.value)}
            placeholder="다른 활동 지역 직접 입력"
            className="mt-3 h-11 w-full rounded-[10px] border border-[#d7d7d7] px-3 text-[13px] outline-none placeholder:text-[#aaa] focus:border-[#98151b]"
          />
        </CollapsibleSection>

        <CollapsibleSection id="social" title="SNS 연결" summary={profile.instagram || profile.socialUrl ? '연결됨' : '연결 안 됨'} open={isSocialOpen} onToggle={() => setIsSocialOpen((open) => !open)}>
          <div className="grid gap-4">
          <label>
            <span className="mb-2 block text-[12px] font-semibold text-[#595959]">Instagram</span>
            <div className="flex h-11 items-center rounded-[10px] border border-[#d7d7d7] px-3 focus-within:border-[#98151b]">
              <span className="mr-1 text-[13px] text-[#858585]">@</span>
              <input value={profile.instagram} onChange={(event) => updateProfile('instagram', event.target.value.replace(/^@/, ''))} placeholder="계정 이름" className="min-w-0 flex-1 text-[13px] outline-none" />
            </div>
          </label>
          <label>
            <span className="mb-2 block text-[12px] font-semibold text-[#595959]">URL</span>
            <input type="url" value={profile.socialUrl} onChange={(event) => updateProfile('socialUrl', event.target.value)} placeholder="https://" className="h-11 w-full rounded-[10px] border border-[#d7d7d7] px-3 text-[13px] outline-none focus:border-[#98151b]" />
          </label>
          <label>
            <span className="mb-2 block text-[12px] font-semibold text-[#595959]">생일 <span className="font-normal text-[#999]">(선택)</span></span>
            <input type="date" value={profile.birthday} onChange={(event) => updateProfile('birthday', event.target.value)} className="h-11 w-full rounded-[10px] border border-[#d7d7d7] px-3 text-[13px] outline-none focus:border-[#98151b]" />
            <span className="mt-1.5 block text-[11px] text-[#999]">생일에 어울리는 와인을 추천해드릴 수 있어요.</span>
          </label>
          </div>
        </CollapsibleSection>

        <section className="mt-7 rounded-[16px] bg-[#faf8f7] p-4" aria-labelledby="price-range-title">
          <div className="flex items-center justify-between">
            <h3 id="price-range-title" className="text-[14px] font-bold">선호 가격대</h3>
            <strong className="text-[13px] text-[#98151b]">{priceRangeOptions[profile.priceRange]}</strong>
          </div>
          <input
            type="range"
            min={0}
            max={priceRangeOptions.length - 1}
            step={1}
            value={profile.priceRange}
            onChange={(event) => updateProfile('priceRange', Number(event.target.value))}
            className="mt-5 h-1.5 w-full cursor-pointer accent-[#98151b]"
          />
          <div className="mt-2 grid grid-cols-4 text-center text-[9px] leading-3 text-[#858585]">
            {priceRangeOptions.map((price) => <span key={price}>{price}</span>)}
          </div>
        </section>

        <CollapsibleSection id="bucket-list" title="와인 버킷리스트" summary={`${profile.bucketWines.length}병 저장`} open={isBucketListOpen} onToggle={() => setIsBucketListOpen((open) => !open)}>
          <p className="mt-1 text-[12px] text-[#858585]">마셔보고 싶은 와인을 사진과 태그로 저장하세요.</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {profile.bucketWines.map((wine) => (
              <article key={wine.id} className="relative overflow-hidden rounded-[12px] border border-[#ebe5e5] bg-[#faf8f7]">
                <div className="flex aspect-square items-center justify-center overflow-hidden bg-[#f4eeee]">
                  {wine.image ? (
                    <img
                      src={wine.image}
                      alt={wine.name}
                      className="w-auto max-w-[68%] object-contain"
                      style={{
                        height: wine.id === 'wine_018' ? '98%' : '86%',
                      }}
                    />
                  ) : <span aria-hidden="true" className="text-[30px]">🍷</span>}
                </div>
                <div className="p-2">
                  <p className="truncate text-[11px] font-bold">{wine.name}</p>
                  <p className="mt-0.5 truncate text-[9px] text-[#98151b]">{wine.tag}</p>
                </div>
                <button type="button" aria-label={`${wine.name} 삭제`} onClick={() => updateProfile('bucketWines', profile.bucketWines.filter((item) => item.id !== wine.id))} className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-black/55 text-[15px] text-white">×</button>
              </article>
            ))}
          </div>
          <form onSubmit={handleAddBucketWine} className="mt-3 rounded-[14px] border border-dashed border-[#d7babc] p-3">
            <div className="flex gap-3">
              <button type="button" onClick={() => bucketImageInputRef.current?.click()} className="flex size-16 shrink-0 flex-col items-center justify-center overflow-hidden rounded-[10px] bg-[#faf0f0] text-[10px] font-semibold text-[#98151b]">
                {bucketDraft.image ? <img src={bucketDraft.image} alt="추가할 와인" className="size-full object-cover" /> : <><span className="text-[22px]">＋</span>사진</>}
              </button>
              <input ref={bucketImageInputRef} type="file" accept="image/*" onChange={handleBucketImageChange} className="hidden" />
              <div className="min-w-0 flex-1 space-y-2">
                <input value={bucketDraft.name} onChange={(event) => setBucketDraft((current) => ({ ...current, name: event.target.value }))} placeholder="와인 이름" className="h-9 w-full rounded-[8px] border border-[#dedede] px-2.5 text-[12px] outline-none focus:border-[#98151b]" />
                <input value={bucketDraft.tag} onChange={(event) => setBucketDraft((current) => ({ ...current, tag: event.target.value }))} placeholder="태그 (예: 부르고뉴)" className="h-9 w-full rounded-[8px] border border-[#dedede] px-2.5 text-[12px] outline-none focus:border-[#98151b]" />
              </div>
            </div>
            <button type="submit" disabled={!bucketDraft.name.trim()} className="mt-3 h-10 w-full rounded-[9px] bg-[#98151b] text-[12px] font-bold text-white disabled:bg-[#d8c1c2]">버킷리스트에 추가</button>
          </form>
        </CollapsibleSection>

        <section className="mt-7 rounded-[16px] border border-[#eadfe0] bg-gradient-to-br from-[#fffafa] to-[#f7eeee] p-4" aria-labelledby="representative-wine-title">
          <h3 id="representative-wine-title" className="text-[14px] font-bold">대표 와인</h3>
          <p className="mt-1 text-[12px] text-[#858585]">프로필에 나를 표현하는 와인 한 병을 소개하세요.</p>
          <div className="mt-4 flex gap-4 rounded-[14px] bg-white p-3 shadow-sm">
            <div className="flex h-[118px] w-20 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[#f5f1ef]">
              {representativeWine?.image ? (
                <img src={representativeWine.image} alt={representativeWine.nameKo} className="h-[108px] w-auto object-contain" />
              ) : (
                <svg aria-label="직접 입력한 대표 와인" viewBox="0 0 48 100" className="h-[92px] w-12 text-[#98151b]" fill="none">
                  <path d="M19 4h10v17l7 13v54c0 5-4 8-8 8h-8c-4 0-8-3-8-8V34l7-13V4Z" fill="currentColor" opacity=".88" />
                  <rect x="13" y="50" width="22" height="27" rx="2" fill="#f7ecec" />
                  <path d="M18 60h12M18 66h8" stroke="#98151b" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-[#98151b]">{profile.representativeWineCaption || '나를 닮은 와인'}</p>
              <p className="mt-1 text-[14px] leading-5 font-bold">{profile.representativeWineName}</p>
              <p className="mt-0.5 line-clamp-2 text-[9px] leading-3 text-[#858585]">{representativeWine?.nameEn ?? '직접 입력한 대표 와인'}</p>
              <p className="mt-2 text-[10px] text-[#595959]">{representativeWine ? `${representativeWine.country} · ${representativeWine.grape}` : '사용자 직접 입력'}</p>
            </div>
          </div>
          <label className="mt-3 block">
            <span className="mb-2 block text-[11px] font-semibold text-[#595959]">대표 와인 선택</span>
            <div className="relative">
              <div className="flex h-11 items-center rounded-[10px] border border-[#d7d7d7] bg-white px-3 focus-within:border-[#98151b] focus-within:ring-1 focus-within:ring-[#98151b]">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="mr-2 size-4 shrink-0 text-[#98151b]" fill="none">
                  <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <input
                  value={representativeWineQuery}
                  onFocus={() => setIsRepresentativeSearchOpen(true)}
                  onBlur={() => window.setTimeout(() => setIsRepresentativeSearchOpen(false), 150)}
                  onChange={(event) => {
                    setRepresentativeWineQuery(event.target.value)
                    setIsRepresentativeSearchOpen(true)
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== 'Enter') return
                    event.preventDefault()
                    if (filteredRepresentativeWines[0]) handleRepresentativeWineChange(filteredRepresentativeWines[0].id)
                    else handleUseCustomRepresentativeWine()
                  }}
                  placeholder="와인 이름을 검색하거나 직접 입력"
                  className="min-w-0 flex-1 text-[12px] outline-none placeholder:text-[#aaa]"
                />
                {representativeWineQuery && <button type="button" aria-label="검색어 지우기" onMouseDown={(event) => event.preventDefault()} onClick={() => { setRepresentativeWineQuery(''); setIsRepresentativeSearchOpen(true) }} className="ml-2 text-[18px] text-[#999]">×</button>}
              </div>

              {isRepresentativeSearchOpen && representativeWineQuery.trim() && (
                <div className="absolute inset-x-0 top-[calc(100%+6px)] z-30 max-h-72 overflow-y-auto rounded-[12px] border border-[#e4dada] bg-white p-1.5 shadow-xl">
                  {filteredRepresentativeWines.length > 0 ? filteredRepresentativeWines.map((wine) => (
                    <button
                      key={wine.id}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleRepresentativeWineChange(wine.id)}
                      className="flex w-full items-center gap-3 rounded-[9px] px-3 py-2 text-left hover:bg-[#faf3f3]"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-[7px] bg-[#f5f1ef]">
                        {wine.image && <img src={wine.image} alt="" className="h-9 w-auto object-contain" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[12px] font-bold">{wine.nameKo}</span>
                        <span className="mt-0.5 block truncate text-[9px] text-[#858585]">{wine.nameEn} · {wine.country}</span>
                      </span>
                    </button>
                  )) : <p className="px-3 py-3 text-center text-[11px] text-[#999]">일치하는 와인이 없습니다.</p>}
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={handleUseCustomRepresentativeWine}
                    className="mt-1 flex h-10 w-full items-center justify-center rounded-[9px] bg-[#fff3f3] text-[11px] font-bold text-[#98151b]"
                  >
                    “{representativeWineQuery.trim()}” 직접 입력으로 사용
                  </button>
                </div>
              )}
            </div>
          </label>
          <label className="mt-3 block">
            <span className="mb-2 block text-[11px] font-semibold text-[#595959]">대표 와인 소개</span>
            <input value={profile.representativeWineCaption} onChange={(event) => updateProfile('representativeWineCaption', event.target.value)} placeholder="나를 닮은 와인" className="h-10 w-full rounded-[8px] border border-[#dedede] bg-white px-2.5 text-[12px] outline-none focus:border-[#98151b]" />
          </label>
        </section>

        <section className="mt-6" aria-labelledby="visibility-title">
          <h3 id="visibility-title" className="text-[13px] font-bold">공개 설정</h3>
          <div className="mt-3 flex min-h-[82px] items-center justify-between rounded-[13px] bg-[#faf8f7] px-4 py-4">
            <div>
              <p className="text-[14px] font-bold">내 프로필 공개</p>
              <p className="mt-1 text-[12px] text-[#858585]">다른 사용자가 내 프로필과 기록을 볼 수 있습니다.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={profile.isPublic}
              aria-label={`내 프로필 공개 ${profile.isPublic ? '켜짐' : '꺼짐'}`}
              onClick={() => handleVisibilityChange(profile.isPublic ? 'private' : 'public')}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98151b] ${profile.isPublic ? 'bg-[#a20f16]' : 'bg-[#c9c9c9]'}`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-1 left-1 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${profile.isPublic ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup" aria-label="프로필 공개 범위">
            {([
              ['public', '전체 공개'],
              ['followers', '팔로워만'],
              ['private', '비공개'],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={profile.visibility === value}
                onClick={() => handleVisibilityChange(value)}
                className={`h-10 rounded-[10px] border text-[12px] font-semibold ${profile.visibility === value ? 'border-[#98151b] bg-[#fff4f4] text-[#98151b]' : 'border-[#dedede] text-[#737373]'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={() => setIsProfilePreviewOpen(true)}
          className="mt-9 flex h-[52px] w-full items-center justify-center gap-2 rounded-[12px] border border-[#98151b] text-[15px] font-bold text-[#98151b]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
            <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="2.7" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          프로필 카드 미리보기
        </button>

        <button
          type="button"
          onClick={() => setIsSaveConfirmOpen(true)}
          className="mt-3 flex h-[55px] w-full items-center justify-center rounded-[12px] bg-[#98151b] text-[16px] font-bold text-white transition hover:bg-[#7f1116] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98151b]"
        >
          저장하기
        </button>
        <p role="status" aria-live="polite" className={`mt-7 text-center text-[13px] transition-colors ${saved ? 'font-semibold text-[#98151b]' : 'text-[#858585]'}`}>
          {saved ? '프로필이 저장되었습니다.' : '변경한 프로필 정보는 즉시 반영됩니다.'}
        </p>
      </main>

      <BottomNav activeItem="MY" onItemClick={handleNav} />

      {saved && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-27 left-1/2 z-[65] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#242424] px-4 py-3 text-[13px] font-medium text-white shadow-lg"
        >
          <span aria-hidden="true" className="flex size-5 items-center justify-center rounded-full bg-[#98151b] text-[12px]">✓</span>
          프로필이 저장되었습니다.
        </div>
      )}

      {photoSaved && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-27 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#242424] px-4 py-3 text-[13px] font-medium text-white shadow-lg"
        >
          <span aria-hidden="true" className="flex size-5 items-center justify-center rounded-full bg-[#98151b] text-[12px]">✓</span>
          프로필 사진이 저장되었습니다.
        </div>
      )}

      {isProfilePreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50" role="presentation" onMouseDown={() => setIsProfilePreviewOpen(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-preview-title"
            onMouseDown={(event) => event.stopPropagation()}
            className="max-h-[92vh] w-full max-w-[430px] overflow-y-auto rounded-t-[24px] bg-[#f5f1f0] px-5 pt-3 pb-[calc(28px+env(safe-area-inset-bottom))] shadow-2xl"
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-[#cfc8c8]" />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h2 id="profile-preview-title" className="text-[18px] font-bold">프로필 카드 미리보기</h2>
                <p className="mt-1 text-[11px] text-[#858585]">커뮤니티에서 다른 사용자에게 보이는 모습입니다.</p>
              </div>
              <button type="button" aria-label="미리보기 닫기" onClick={() => setIsProfilePreviewOpen(false)} className="flex size-9 items-center justify-center rounded-full bg-white text-[23px] text-[#737373]">×</button>
            </div>

            <article className="mt-5 overflow-hidden rounded-[22px] bg-white shadow-[0_12px_35px_rgba(89,32,35,0.14)]">
              <div className="h-24 bg-[radial-gradient(circle_at_top_right,#c9676b,transparent_45%),linear-gradient(135deg,#751017,#a72b31)]" />
              <div className="relative px-5 pb-6">
                <div className="absolute -top-10 flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#faf8f7] shadow-md">
                  {selectedProfileEmoji ? (
                    <span className="flex size-full items-center justify-center" style={{ backgroundColor: selectedProfileEmoji.background }}><ProfileEmojiIcon option={selectedProfileEmoji} large /></span>
                  ) : profile.profileImage ? (
                    <img src={profile.profileImage} alt="프로필" className="size-full object-cover" />
                  ) : (
                    <span className="text-[34px]">🍷</span>
                  )}
                </div>
                <div className="min-h-12 pt-3 pl-24">
                  <h3 className="truncate text-[18px] font-bold">{profile.nickname || '닉네임'}</h3>
                  <p className="mt-0.5 text-[11px] font-semibold text-[#98151b]">🍷 {profile.wineLevel}</p>
                </div>
                <p className="mt-4 text-[13px] leading-5 text-[#595959]">{profile.bio || '한 줄 소개를 입력해주세요.'}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-[#f8eeee] px-2.5 py-1 text-[10px] font-semibold text-[#98151b]">{profile.wineTendency}</span>
                  <span className="rounded-full bg-[#f8eeee] px-2.5 py-1 text-[10px] font-semibold text-[#98151b]">오늘은 {profile.todayTaste}</span>
                  <span className="rounded-full bg-[#f4f2f2] px-2.5 py-1 text-[10px] text-[#595959]">📍 {profile.activityArea}</span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="rounded-[12px] bg-[#faf8f7] p-3">
                    <p className="text-[10px] text-[#858585]">선호 가격대</p>
                    <p className="mt-1 text-[12px] font-bold">{priceRangeOptions[profile.priceRange]}</p>
                  </div>
                  <div className="flex min-w-0 items-center gap-2.5 rounded-[12px] bg-[#faf8f7] p-2.5">
                    <span className="flex h-14 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#f1eaea]">
                      {representativeWine?.image ? (
                        <img src={representativeWine.image} alt={representativeWine.nameKo} className="h-[52px] w-auto object-contain" />
                      ) : (
                        <svg aria-label="직접 입력한 대표 와인" viewBox="0 0 48 100" className="h-12 w-7 text-[#98151b]" fill="none">
                          <path d="M19 4h10v17l7 13v54c0 5-4 8-8 8h-8c-4 0-8-3-8-8V34l7-13V4Z" fill="currentColor" opacity=".88" />
                          <rect x="13" y="50" width="22" height="27" rx="2" fill="#f7ecec" />
                        </svg>
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[9px] text-[#858585]">대표 와인</span>
                      <span className="mt-1 block line-clamp-2 text-[11px] leading-4 font-bold text-[#98151b]">{profile.representativeWineName || '미설정'}</span>
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[11px] font-bold">좋아하는 페어링</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">{profile.preferredPairings.map((item) => <span key={item} className="rounded-full border border-[#e6dcdc] px-2 py-1 text-[9px]">{item}</span>)}</div>
                </div>
                <div className="mt-4">
                  <p className="text-[11px] font-bold">관심사</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">{profile.interests.map((item) => <span key={item} className="rounded-full border border-[#e6dcdc] px-2 py-1 text-[9px]">{item}</span>)}</div>
                </div>

                {profile.bucketWines.length > 0 && (
                  <div className="mt-5 border-t border-black/5 pt-4">
                    <p className="text-[11px] font-bold">마셔보고 싶은 와인</p>
                    <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                      {profile.bucketWines.slice(0, 4).map((wine) => <span key={wine.id} className="shrink-0 rounded-full bg-[#98151b] px-3 py-1.5 text-[9px] font-medium text-white">🍷 {wine.name}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </article>

            <button type="button" onClick={() => setIsProfilePreviewOpen(false)} className="mt-5 h-[50px] w-full rounded-[11px] bg-[#98151b] text-[14px] font-bold text-white">편집으로 돌아가기</button>
          </section>
        </div>
      )}

      {isSaveConfirmOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-6"
          role="presentation"
          onMouseDown={() => setIsSaveConfirmOpen(false)}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="save-confirm-title"
            aria-describedby="save-confirm-description"
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-[340px] rounded-[18px] bg-white px-5 pt-6 pb-5 text-center shadow-2xl"
          >
            <span aria-hidden="true" className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#f8eeee] text-[#98151b]">
              <svg viewBox="0 0 24 24" className="size-6" fill="none">
                <path d="M5 4h12l2 2v14H5V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M8 4v6h8V4M8 20v-6h8v6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 id="save-confirm-title" className="mt-4 text-[17px] font-bold">프로필 세팅을 저장하시겠습니까?</h2>
            <p id="save-confirm-description" className="mt-2 text-[13px] leading-5 text-[#858585]">
              변경한 프로필 정보와 와인 취향이 저장됩니다.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setIsSaveConfirmOpen(false)}
                className="h-12 rounded-[11px] border border-[#dedede] text-[14px] font-semibold text-[#595959]"
              >
                취소
              </button>
              <button
                type="button"
                autoFocus
                onClick={handleSave}
                className="h-12 rounded-[11px] bg-[#98151b] text-[14px] font-bold text-white"
              >
                확인
              </button>
            </div>
          </section>
        </div>
      )}

      {isCameraOpen && (
        <section
          role="dialog"
          aria-modal="true"
          aria-label="프로필 사진 촬영"
          className="fixed inset-0 z-[100] mx-auto flex w-full max-w-[430px] flex-col overflow-hidden bg-black text-white"
        >
          <header className="relative z-10 flex h-16 shrink-0 items-center justify-between px-5">
            <button
              type="button"
              aria-label="카메라 닫기"
              onClick={() => setIsCameraOpen(false)}
              className="flex size-10 items-center justify-center rounded-full bg-white/15 text-[28px] backdrop-blur"
            >
              ×
            </button>
            <h2 className="text-[16px] font-bold">사진 촬영</h2>
            <button
              type="button"
              aria-label="전면 후면 카메라 전환"
              onClick={() => setCameraFacingMode((mode) => mode === 'user' ? 'environment' : 'user')}
              className="flex size-10 items-center justify-center rounded-full bg-white/15 backdrop-blur"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
                <path d="M4 8a8 8 0 0 1 13.5-2L20 8.5M20 16a8 8 0 0 1-13.5 2L4 15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 4v4.5h-4.5M4 20v-4.5h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </header>

          <div className="relative min-h-0 flex-1 overflow-hidden bg-[#151515]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`size-full object-cover ${cameraFacingMode === 'user' ? '-scale-x-100' : ''}`}
            />
            <div className="pointer-events-none absolute inset-6 rounded-full border border-white/60 shadow-[0_0_0_999px_rgba(0,0,0,0.22)]" />
            {cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#151515] px-8 text-center">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-10 text-white/60" fill="none">
                  <path d="M7.5 6.5 9 4.5h6l1.5 2H19A2.5 2.5 0 0 1 21.5 9v8A2.5 2.5 0 0 1 19 19.5H5A2.5 2.5 0 0 1 2.5 17V9A2.5 2.5 0 0 1 5 6.5h2.5Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m5 3 14 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <p className="mt-4 text-[14px] font-semibold">카메라를 실행할 수 없습니다.</p>
                <p className="mt-2 text-[12px] leading-5 text-white/60">브라우저의 카메라 권한을 허용하거나 기기 카메라를 이용해주세요.</p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCameraOpen(false)
                    cameraInputRef.current?.click()
                  }}
                  className="mt-5 rounded-full bg-white px-5 py-3 text-[13px] font-bold text-[#171717]"
                >
                  기기 카메라 열기
                </button>
              </div>
            )}
          </div>

          <div className="flex h-32 shrink-0 items-center justify-center pb-[env(safe-area-inset-bottom)]">
            <button
              type="button"
              aria-label="사진 촬영"
              disabled={Boolean(cameraError)}
              onClick={handleCapturePhoto}
              className="flex size-[74px] items-center justify-center rounded-full border-[4px] border-white disabled:opacity-40"
            >
              <span className="size-[58px] rounded-full bg-white transition active:scale-90" />
            </button>
          </div>
        </section>
      )}

      {editorImage && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-editor-title"
          className="fixed inset-0 z-[100] mx-auto flex w-full max-w-[430px] flex-col overflow-y-auto bg-white text-[#171717]"
        >
          <header className="flex h-[64px] shrink-0 items-center justify-between border-b border-black/5 px-5">
            <button
              type="button"
              onClick={() => {
                setIsPhotoApplyConfirmOpen(false)
                setEditorImage('')
              }}
              className="rounded-lg px-1 py-2 text-[14px] font-semibold text-[#737373]"
            >
              취소
            </button>
            <h2 id="photo-editor-title" className="text-[17px] font-bold">사진 자르기 및 보정</h2>
            <button
              type="button"
              onClick={() => setIsPhotoApplyConfirmOpen(true)}
              className="rounded-lg px-1 py-2 text-[14px] font-bold text-[#98151b]"
            >
              적용
            </button>
          </header>

          <div className="px-5 pt-6 pb-8">
            <div
              ref={editorCropRef}
              onPointerDown={handleEditorPointerDown}
              onPointerMove={handleEditorPointerMove}
              onPointerUp={handleEditorPointerEnd}
              onPointerCancel={handleEditorPointerEnd}
              onWheel={handleEditorWheel}
              className="relative mx-auto aspect-square w-full max-w-[390px] touch-none select-none overflow-hidden rounded-[18px] bg-black cursor-grab active:cursor-grabbing"
            >
              <img
                src={editorImage}
                alt="편집 중인 프로필"
                draggable={false}
                className="pointer-events-none size-full object-cover transition-[filter,transform] duration-100"
                style={{
                  filter: `brightness(${brightness}%) contrast(${contrast}%) blur(${skinSmoothing * 0.012}px)`,
                  transform: `translate(${-cropX * 0.16}%, ${-cropY * 0.16}%) scale(${cropZoom})`,
                }}
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <span key={index} className="border-[0.5px] border-white/35" />
                ))}
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-full border-2 border-white/80" />
            </div>

            <p className="mt-3 text-center text-[12px] leading-5 text-[#858585]">한 손가락으로 이동하고 두 손가락을 벌리거나 오므려 확대·축소하세요.<br className="sm:hidden" /> 마우스에서는 드래그와 휠을 사용할 수 있습니다.</p>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="사진 축소"
                onClick={() => setCropZoom((current) => clampZoom(current - 0.1))}
                className="flex size-9 items-center justify-center rounded-full border border-[#dedede] text-[20px] text-[#595959]"
              >
                −
              </button>
              <span className="min-w-14 text-center text-[12px] font-semibold text-[#98151b]">{Math.round(cropZoom * 100)}%</span>
              <button
                type="button"
                aria-label="사진 확대"
                onClick={() => setCropZoom((current) => clampZoom(current + 0.1))}
                className="flex size-9 items-center justify-center rounded-full border border-[#dedede] text-[20px] text-[#595959]"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => {
                  setCropZoom(1)
                  setCropX(0)
                  setCropY(0)
                }}
                className="ml-2 h-9 rounded-full bg-[#faf8f7] px-3 text-[11px] font-semibold text-[#737373]"
              >
                위치 초기화
              </button>
            </div>

            <div className="mt-7 rounded-[16px] bg-[#faf8f7] p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-bold">간단 보정</h3>
                <button
                  type="button"
                  onClick={() => {
                    setBrightness(100)
                    setContrast(100)
                    setSkinSmoothing(0)
                  }}
                  className="text-[12px] font-semibold text-[#98151b]"
                >
                  보정 초기화
                </button>
              </div>
              <div className="mt-4 space-y-5">
                <EditorSlider label="화사하게" value={brightness} min={75} max={135} step={1} display={`${brightness}%`} onChange={setBrightness} />
                <EditorSlider label="대비" value={contrast} min={75} max={135} step={1} display={`${contrast}%`} onChange={setContrast} />
                <EditorSlider label="피부 보정" value={skinSmoothing} min={0} max={100} step={1} display={skinSmoothing === 0 ? '사용 안 함' : `${skinSmoothing}%`} onChange={setSkinSmoothing} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPhotoApplyConfirmOpen(true)}
              className="mt-7 h-[52px] w-full rounded-[12px] bg-[#98151b] text-[15px] font-bold text-white"
            >
              편집 적용하기
            </button>
          </div>
        </section>
      )}

      {isPhotoApplyConfirmOpen && editorImage && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/45 px-6"
          role="presentation"
          onMouseDown={() => setIsPhotoApplyConfirmOpen(false)}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="photo-apply-confirm-title"
            aria-describedby="photo-apply-confirm-description"
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-[340px] rounded-[18px] bg-white px-5 pt-6 pb-5 text-center shadow-2xl"
          >
            <span aria-hidden="true" className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#f8eeee] text-[#98151b]">
              <svg viewBox="0 0 24 24" className="size-6" fill="none">
                <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="8.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="m5.5 17 4.2-4.2 2.8 2.6 2.4-2.3 3.6 3.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 id="photo-apply-confirm-title" className="mt-4 text-[17px] font-bold">저장하시겠습니까?</h2>
            <p id="photo-apply-confirm-description" className="mt-2 text-[13px] leading-5 text-[#858585]">
              자르기와 보정이 적용된 사진이 프로필에 저장됩니다.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setIsPhotoApplyConfirmOpen(false)}
                className="h-12 rounded-[11px] border border-[#dedede] text-[14px] font-semibold text-[#595959]"
              >
                취소
              </button>
              <button
                type="button"
                autoFocus
                onClick={handleApplyEditedImage}
                className="h-12 rounded-[11px] bg-[#98151b] text-[14px] font-bold text-white"
              >
                완료
              </button>
            </div>
          </section>
        </div>
      )}

      {isPhotoMenuOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/35" role="presentation" onMouseDown={() => setIsPhotoMenuOpen(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="photo-menu-title"
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-[430px] rounded-t-[24px] bg-white px-5 pt-3 pb-[calc(24px+env(safe-area-inset-bottom))] shadow-2xl"
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-[#d9d9d9]" />
            <div className="mt-5 flex items-center justify-between">
              <h2 id="photo-menu-title" className="text-[18px] font-bold">프로필 사진 변경</h2>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setIsPhotoMenuOpen(false)}
                className="flex size-8 items-center justify-center rounded-full bg-[#faf8f7] text-[22px] text-[#737373]"
              >
                ×
              </button>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2.5">
              <PhotoOptionButton
                label="촬영하기"
                onClick={handleOpenCamera}
                icon={(
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
                    <path d="M7.5 6.5 9 4.5h6l1.5 2H19A2.5 2.5 0 0 1 21.5 9v8A2.5 2.5 0 0 1 19 19.5H5A2.5 2.5 0 0 1 2.5 17V9A2.5 2.5 0 0 1 5 6.5h2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
              />
              <PhotoOptionButton
                label="앨범에서 선택"
                onClick={() => albumInputRef.current?.click()}
                icon={(
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="8.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.6" />
                    <path d="m5.5 17 4.2-4.2 2.8 2.6 2.4-2.3 3.6 3.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              />
              <PhotoOptionButton
                label="이모지 선택"
                onClick={() => setIsEmojiPickerOpen(true)}
                icon={<span aria-hidden="true" className="text-[25px] leading-none">😊</span>}
              />
            </div>

            {profile.profileImage && (
              <button
                type="button"
                onClick={() => {
                  updateProfile('profileImage', '')
                  setIsPhotoMenuOpen(false)
                }}
                className="mt-4 h-11 w-full rounded-[10px] border border-[#ead7d8] text-[13px] font-semibold text-[#98151b]"
              >
                현재 프로필 사진 삭제
              </button>
            )}
          </section>
        </div>
      )}

      {isEmojiPickerOpen && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/35" role="presentation" onMouseDown={() => setIsEmojiPickerOpen(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="emoji-picker-title"
            onMouseDown={(event) => event.stopPropagation()}
            className="max-h-[84vh] w-full max-w-[430px] overflow-y-auto rounded-t-[24px] bg-white px-5 pt-3 pb-[calc(28px+env(safe-area-inset-bottom))] shadow-2xl"
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-[#d9d9d9]" />
            <div className="mt-5 flex items-start justify-between">
              <div>
                <h2 id="emoji-picker-title" className="text-[18px] font-bold">이모지 선택하기</h2>
                <p className="mt-1 text-[12px] text-[#858585]">프로필로 사용할 이모지를 선택해주세요.</p>
              </div>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setIsEmojiPickerOpen(false)}
                className="flex size-8 items-center justify-center rounded-full bg-[#faf8f7] text-[22px] text-[#737373]"
              >
                ×
              </button>
            </div>
            <div className="mt-5 space-y-5" aria-label="프로필 이모지 목록">
              {profileEmojiGroups.map((group) => (
                <section key={group.title} aria-label={group.title}>
                  <h3 className="mb-2 text-[12px] font-bold text-[#595959]">{group.title}</h3>
                  <div className="grid grid-cols-5 gap-2.5">
                    {group.options.map((option) => {
                      const selected = profile.profileImage === `emoji:${option.id}`
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-label={`${option.label} 선택`}
                          aria-pressed={selected}
                          title={option.label}
                          onClick={() => handleEmojiSelect(option)}
                          style={{ backgroundColor: option.background }}
                          className={`flex aspect-square items-center justify-center rounded-[14px] border transition hover:-translate-y-0.5 ${selected ? 'border-[#98151b] ring-1 ring-[#98151b]' : 'border-[#e6e2e2]'}`}
                        >
                          <ProfileEmojiIcon option={option} />
                        </button>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </div>
      )}

      {isStylePickerOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/35" role="presentation" onMouseDown={() => setIsStylePickerOpen(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="style-picker-title"
            onMouseDown={(event) => event.stopPropagation()}
            className="max-h-[78vh] w-full max-w-[430px] overflow-y-auto rounded-t-[24px] bg-white px-5 pt-3 pb-[calc(28px+env(safe-area-inset-bottom))] shadow-2xl"
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-[#d9d9d9]" />
            <div className="mt-5 flex items-start justify-between">
              <div>
                <h2 id="style-picker-title" className="text-[18px] font-bold">관심 와인 스타일</h2>
                <p className="mt-1 text-[12px] text-[#858585]">취향에 맞는 태그를 여러 개 선택해보세요.</p>
              </div>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setIsStylePickerOpen(false)}
                className="flex size-8 items-center justify-center rounded-full bg-[#faf8f7] text-[22px] text-[#737373]"
              >
                ×
              </button>
            </div>

            {profile.customWineStyles.length > 0 && (
              <div className="mt-5">
                <p className="mb-2 text-[12px] font-semibold text-[#737373]">내가 추가한 태그</p>
                <div className="flex flex-wrap gap-2">
                  {profile.customWineStyles.map((style) => {
                    const selected = profile.wineStyles.includes(style)
                    return (
                      <button
                        key={style}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleWineStyle(style)}
                        className={`h-9 rounded-full border px-3.5 text-[12px] font-medium transition ${selected ? 'border-[#98151b] bg-[#98151b] text-white' : 'border-[#d9b8ba] bg-[#fff8f8] text-[#98151b]'}`}
                      >
                        {selected && <span aria-hidden="true" className="mr-1">✓</span>}
                        {style}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-2" aria-label="추천 와인 스타일 20개">
              {availableWineStyles.filter((style) => !profile.customWineStyles.includes(style)).map((style) => {
                const selected = profile.wineStyles.includes(style)
                return (
                  <button
                    key={style}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleWineStyle(style)}
                    className={`h-9 rounded-full border px-3.5 text-[12px] font-medium transition ${selected ? 'border-[#98151b] bg-[#98151b] text-white' : 'border-[#dedede] bg-white text-[#4c4c4c] hover:border-[#98151b] hover:text-[#98151b]'}`}
                  >
                    {selected && <span aria-hidden="true" className="mr-1">✓</span>}
                    {style}
                  </button>
                )
              })}
            </div>

            <form onSubmit={handleAddCustomStyle} className="mt-6">
              <label htmlFor="custom-wine-style" className="text-[13px] font-bold">직접 입력</label>
              <div className="mt-2 flex gap-2">
                <input
                  id="custom-wine-style"
                  value={customStyle}
                  maxLength={16}
                  onChange={(event) => setCustomStyle(event.target.value)}
                  placeholder="예: 부드러운타닌"
                  className="h-11 min-w-0 flex-1 rounded-[10px] border border-[#d7d7d7] px-3 text-[13px] outline-none placeholder:text-[#aaa] focus:border-[#98151b] focus:ring-1 focus:ring-[#98151b]"
                />
                <button
                  type="submit"
                  disabled={!customStyle.trim()}
                  className="h-11 rounded-[10px] bg-[#98151b] px-5 text-[13px] font-bold text-white disabled:bg-[#d8c1c2]"
                >
                  추가
                </button>
              </div>
              {filteredStyleSuggestions.length > 0 && (
                <div className="mt-3 rounded-[12px] border border-[#eadfe0] bg-[#fffafa] p-3">
                  <p className="text-[11px] font-semibold text-[#858585]">현재 관심 스타일에 없는 추천 태그</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {filteredStyleSuggestions.map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => addCustomWineStyle(style)}
                        className="h-8 rounded-full border border-[#d9b8ba] bg-white px-3 text-[11px] font-medium text-[#98151b] transition hover:bg-[#f8eeee]"
                      >
                        + {style}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </form>

            <button
              type="button"
              onClick={() => setIsStyleSaveConfirmOpen(true)}
              className="mt-6 h-[50px] w-full rounded-[11px] bg-[#98151b] text-[15px] font-bold text-white"
            >
              선택 완료 ({profile.wineStyles.length})
            </button>
          </section>
        </div>
      )}

      {isStyleSaveConfirmOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-6"
          role="presentation"
          onMouseDown={() => setIsStyleSaveConfirmOpen(false)}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="style-save-confirm-title"
            aria-describedby="style-save-confirm-description"
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-[340px] rounded-[18px] bg-white px-5 pt-6 pb-5 text-center shadow-2xl"
          >
            <span aria-hidden="true" className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#f8eeee] text-[24px]">🍷</span>
            <h2 id="style-save-confirm-title" className="mt-4 text-[17px] font-bold">관심 와인 스타일 선택을 저장하시겠습니까?</h2>
            <p id="style-save-confirm-description" className="mt-2 text-[13px] leading-5 text-[#858585]">
              선택한 {profile.wineStyles.length}개의 태그가 프로필에 반영됩니다.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setIsStyleSaveConfirmOpen(false)}
                className="h-12 rounded-[11px] border border-[#dedede] text-[14px] font-semibold text-[#595959]"
              >
                취소
              </button>
              <button
                type="button"
                autoFocus
                onClick={handleConfirmWineStyleSelection}
                className="h-12 rounded-[11px] bg-[#98151b] text-[14px] font-bold text-white"
              >
                확인
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

function SelectArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#98151b]" fill="none">
      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhotoOptionButton({
  label,
  icon,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[94px] flex-col items-center justify-center gap-2 rounded-[14px] border border-[#e7e1e1] bg-[#faf8f7] px-2 text-[#98151b] transition hover:border-[#98151b]"
    >
      {icon}
      <span className="text-[12px] font-semibold text-[#3c3c3c]">{label}</span>
    </button>
  )
}

function ProfileEmojiIcon({ option, large = false }: { option: ProfileEmojiOption; large?: boolean }) {
  if (option.customIcon) {
    return <CustomProfileIcon type={option.customIcon} large={large} />
  }

  if (!option.wineColor) {
    return (
      <span aria-hidden="true" className={`${large ? 'text-[38px]' : 'text-[27px]'} leading-none`}>
        {option.symbol}
      </span>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={large ? 'size-12' : 'size-9'}
      fill="none"
    >
      <path
        d="M10 5h20l-1.8 12.4C27.5 22.2 24 25 20 25s-7.5-2.8-8.2-7.6L10 5Z"
        fill="white"
        fillOpacity="0.78"
        stroke="#6f4b4d"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M11.3 13h17.4l-.7 4.5c-.6 3.8-3.5 6-8 6s-7.4-2.2-8-6l-.7-4.5Z"
        fill={option.wineColor}
      />
      {option.id === 'wine-sparkling' && (
        <g fill="#fff8cf">
          <circle cx="17" cy="17" r="1" />
          <circle cx="22" cy="15" r="0.8" />
          <circle cx="24" cy="19" r="0.7" />
        </g>
      )}
      <path d="M20 25v8M14.5 35h11" stroke="#6f4b4d" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CustomProfileIcon({
  type,
  large,
}: {
  type: NonNullable<ProfileEmojiOption['customIcon']>
  large: boolean
}) {
  const className = large ? 'size-12' : 'size-9'

  if (type === 'blueberry') {
    return (
      <svg aria-hidden="true" viewBox="0 0 44 44" className={className}>
        <path d="M21 13c-2.5-5.6 1.4-9.2 7.6-8.5-1.1 4.8-3.6 7.6-7.6 8.5Z" fill="#5d8b43" />
        <circle cx="16" cy="24" r="9" fill="#4457a8" />
        <circle cx="28" cy="27" r="9.5" fill="#354997" />
        <circle cx="25" cy="17" r="8" fill="#5d70bd" />
        <path d="m25 10 1.5 3.5 3.7.2-2.9 2.3 1 3.6-3.3-2-3.2 2 1-3.6-2.8-2.3 3.6-.2L25 10Z" fill="#273878" />
        <circle cx="13" cy="21" r="2" fill="#7e8dd0" opacity=".8" />
        <circle cx="25" cy="24" r="2.2" fill="#7182c7" opacity=".65" />
      </svg>
    )
  }

  if (type === 'olive') {
    return (
      <svg aria-hidden="true" viewBox="0 0 44 44" className={className} fill="none">
        <path d="M11 35c8-12 13-18 24-26" stroke="#6e7131" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 15c1-6 6-9 12-8-1 6-5 9-12 8Z" fill="#819846" />
        <path d="M12 31c-4-5-2-11 3-15 6 3 8 9 5 14-2.4 4-5.5 4.3-8 1Z" fill="#68752c" />
        <ellipse cx="28.5" cy="23" rx="7" ry="10" transform="rotate(35 28.5 23)" fill="#87963d" />
        <ellipse cx="27" cy="20" rx="2.2" ry="3.8" transform="rotate(35 27 20)" fill="#a9b55f" opacity=".8" />
      </svg>
    )
  }

  if (type === 'rainbow-heart') {
    return (
      <svg aria-hidden="true" viewBox="0 0 44 44" className={className}>
        <defs>
          <linearGradient id="profile-rainbow-heart" x1="8" y1="8" x2="37" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ef4444" />
            <stop offset=".2" stopColor="#f59e0b" />
            <stop offset=".4" stopColor="#eab308" />
            <stop offset=".58" stopColor="#22c55e" />
            <stop offset=".78" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <path d="M22 37S6 28.2 6 16.8C6 10.7 13.4 7 18 11.5L22 15l4-3.5C30.6 7 38 10.7 38 16.8 38 28.2 22 37 22 37Z" fill="url(#profile-rainbow-heart)" />
        <path d="M12 15c1.3-2.5 3.8-3.2 6-1.4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".7" />
      </svg>
    )
  }

  if (type === 'steak') {
    return (
      <svg aria-hidden="true" viewBox="0 0 44 44" className={className} fill="none">
        <path d="M8 26c0-8 7-15 16-17 7-1.6 13 2.5 13 9.2 0 8.3-8.5 17.2-18.5 17.2C12 35.4 8 32.2 8 26Z" fill="#a93438" stroke="#7e2328" strokeWidth="1.8" />
        <ellipse cx="27.5" cy="19.5" rx="5.5" ry="4.5" fill="#f2d4bd" transform="rotate(-25 27.5 19.5)" />
        <ellipse cx="28" cy="19.5" rx="2.8" ry="2.1" fill="#fff0df" transform="rotate(-25 28 19.5)" />
        <path d="M12 27c5-1 7.5 2.5 12 2 4-.4 6-3.6 9-4.5" stroke="#ee7771" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 44 44" className={className} fill="none">
      <path d="M34.5 12.5C27 7 16 10 11.5 18c-4.2 7.4.5 15.8 9.2 16.6 6.3.6 11.8-3.3 13.3-8.8-4.7 2.1-9.8.2-11.3-4.1-1.3-3.7 1-8 5.2-9.3 2.2-.7 4.5-.6 6.6.1Z" fill="#ef7f55" stroke="#c65336" strokeWidth="1.7" />
      <path d="M13 17.5c4.4 1.1 7.2 4 8.3 8.6M10.3 23c4.6.8 7.3 3.5 8.2 7.8" stroke="#ffd0b7" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="31" cy="15.5" r="1.2" fill="#34221d" />
      <path d="m35 12 4-2M35.5 14.5l4 .5" stroke="#c65336" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 31 8 35M16 34l-1 5" stroke="#ef7f55" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function EditorSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-[12px]">
        <span className="font-semibold text-[#595959]">{label}</span>
        <span className="text-[#98151b]">{display}</span>
      </span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1.5 w-full cursor-pointer accent-[#98151b]"
      />
    </label>
  )
}

function ChoiceChip({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`h-9 rounded-full border px-3 text-[12px] font-medium transition ${selected ? 'border-[#98151b] bg-[#98151b] text-white' : 'border-[#dedede] bg-white text-[#595959]'}`}
    >
      {label}
    </button>
  )
}

function CollapsibleSection({
  id,
  title,
  summary,
  open,
  onToggle,
  children,
}: {
  id: string
  title: string
  summary: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  const contentId = `${id}-content`

  return (
    <section className="mt-4 overflow-hidden rounded-[14px] border border-[#ebe5e5] bg-[#faf8f7]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={onToggle}
        className="flex min-h-[62px] w-full items-center justify-between gap-3 px-4 text-left"
      >
        <span className="min-w-0">
          <span className="block text-[14px] font-bold">{title}</span>
          <span className="mt-1 block truncate text-[11px] font-medium text-[#98151b]">{summary}</span>
        </span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className={`size-5 shrink-0 text-[#98151b] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none">
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div id={contentId} className="border-t border-[#ebe5e5] bg-white px-4 pt-4 pb-4">{children}</div>}
    </section>
  )
}
