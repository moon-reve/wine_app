import Header from '../components/Header'
import filterIcon from '../assets/list/filter-icon.svg'
import starIcon from '../assets/list/container-star.svg'
import bottleTematata from '../assets/list/bottle-tematata.png'
import bottleChateauMontelena from '../assets/list/bottle-chateau-montelena.png'
import bottleFarNiente from '../assets/list/bottle-far-niente.png'
import bottleOysterBay from '../assets/list/bottle-oyster-bay.png'

type Wine = {
  id: string
  name: string
  region: string
  regionTextSize: string
  price: string
  rating: string
  image: string
}

const wines: Wine[] = [
  {
    id: 'tematata',
    name: '테마타 에스테이트',
    region: '뉴질랜드 · 호크스 베이 · 샤도네이',
    regionTextSize: 'text-[11px]',
    price: '₩40,500',
    rating: '4.2',
    image: bottleTematata,
  },
  {
    id: 'chateau-montelena',
    name: '샤또 몬텔레나',
    region: '미국 · 나파 밸리 · 카베르네 소비뇽',
    regionTextSize: 'text-[12px]',
    price: '₩89,000',
    rating: '5.0',
    image: bottleChateauMontelena,
  },
  {
    id: 'far-niente',
    name: '파 니엔테',
    region: '미국 · 나파 밸리 · 샤도네이',
    regionTextSize: 'text-[12px]',
    price: '₩159,000',
    rating: '4.6',
    image: bottleFarNiente,
  },
  {
    id: 'oyster-bay',
    name: '오이스터 베이',
    region: '뉴질랜드 · 말보로 · 소비뇽 블랑',
    regionTextSize: 'text-[12px]',
    price: '₩36,500',
    rating: '3.0',
    image: bottleOysterBay,
  },
]

function List() {
  return (
    <div className="min-h-screen w-full bg-white text-[#0d0d0d]" data-node-id="690:403">
      <Header tone="light" titleColorClassName="text-black" />

      <main className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <h1
            className="font-playfair text-[38px] leading-[1.6] font-bold text-[#831317]"
            style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}
          >
            LIST
          </h1>
          <img src={filterIcon} alt="필터" className="h-[18px] w-[19px]" />
        </div>

        <div className="relative mt-[27px] flex border-b border-[#7b7b7b]">
          <button
            type="button"
            className="relative flex-1 pb-[10px] text-center text-[18px] leading-[1.3] font-bold tracking-[-0.36px] text-[#831317]"
          >
            리스트
            <span className="absolute inset-x-0 bottom-[-1px] h-[3px] bg-[#831317]" />
          </button>
          <button
            type="button"
            className="flex-1 pb-[10px] text-center text-[18px] leading-[1.3] font-medium tracking-[-0.36px] text-[#aaa]"
          >
            지도
          </button>
        </div>

        <p className="mt-[22px] text-[14px] leading-[20px] text-[#534343]">전체 128종</p>

        <div className="mt-[18px]">
          {wines.map((wine) => (
            <div key={wine.id}>
              <hr className="m-0 h-0 border-0 border-t border-[#c3c3c3]" />
              <div className="flex items-start gap-[37px] py-[24px] pl-[24px]">
                <div className="flex size-[89px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#ece4a2]">
                  <img src={wine.image} alt={wine.name} className="h-[85%] w-auto object-contain" />
                </div>
                <div className="flex flex-col gap-[8px] pt-[4px]">
                  <div>
                    <p className="text-[20px] leading-[25px] font-semibold text-[#1e1b18]">{wine.name}</p>
                    <p className={`${wine.regionTextSize} leading-[25px] text-[#817f7e]`}>{wine.region}</p>
                  </div>
                  <div className="flex w-[220px] items-center justify-between">
                    <p className="text-[16px] leading-[24px] font-bold text-[#1e1b18]">{wine.price}</p>
                    <div className="flex items-center gap-[4px]">
                      <img src={starIcon} alt="" className="h-[14.25px] w-[15px]" />
                      <p className="text-[16px] leading-[24px] font-bold text-[#561922]">{wine.rating}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <hr className="m-0 h-0 border-0 border-t border-[#c3c3c3]" />
        </div>
      </main>
    </div>
  )
}

export default List
