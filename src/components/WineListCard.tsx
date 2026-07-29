import type { KeyboardEvent } from 'react'
import starIcon from '../assets/list/container-star.svg'
import heartEmptyIcon from '../assets/list/heart-empty.svg'
import heartFilledIcon from '../assets/list/heart-filled.svg'
import type { Wine } from '../data/wineCatalog'

type WineListCardProps = {
  wine: Wine
  isLiked: boolean
  showDivider: boolean
  onOpen: () => void
  onToggleLike: () => void
}

function WineListCard({
  wine,
  isLiked,
  showDivider,
  onOpen,
  onToggleLike,
}: WineListCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen()
    }
  }

  return (
    <article
      role="button"
      data-guide-target
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      className="wine-list-card"
    >
      <div
        className="flex size-[89px] shrink-0 items-center justify-center overflow-hidden rounded-full"
        style={{ backgroundColor: wine.bgColor }}
      >
        <img src={wine.image} alt={wine.name} className="h-[85%] w-auto object-contain" />
      </div>

      <div className="wine-list-card__details">
        <div className="wine-list-card__copy">
          <p className="wine-list-card__text text-[18px] leading-[1.2] font-semibold text-[#1e1b18]">
            {wine.name}
          </p>
          <p className={`wine-list-card__text ${wine.regionTextSize} leading-[1.2] font-normal text-[#817f7e]`}>
            {wine.region}
          </p>
        </div>

        <button
          type="button"
          aria-label={isLiked ? `${wine.name} 좋아요 취소` : `${wine.name} 좋아요`}
          onClick={(event) => {
            event.stopPropagation()
            onToggleLike()
          }}
          className="wine-list-card__heart flex h-[19px] w-[19px] items-center justify-center"
        >
          <img src={isLiked ? heartFilledIcon : heartEmptyIcon} alt="" className="h-full w-full" />
        </button>

        <p className="wine-list-card__price wine-list-card__text text-[16px] leading-[24px] font-bold text-[#1e1b18]">
          {wine.price}
        </p>

        <div className="wine-list-card__rating flex shrink-0 items-center gap-[4px]">
          <img src={starIcon} alt="" className="h-[14.25px] w-[15px]" />
          <p className="text-[16px] leading-[24px] font-bold whitespace-nowrap text-[#831317]">
            {wine.rating}
          </p>
        </div>
      </div>

      {showDivider && <div className="absolute inset-x-0 bottom-0 h-px bg-[#d9d9d9]" />}
    </article>
  )
}

export default WineListCard
