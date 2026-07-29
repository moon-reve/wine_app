import heartEmptyIcon from '../assets/list/heart-empty.svg'
import heartFilledIcon from '../assets/list/heart-filled.svg'
import { useLikedWines } from '../context/likedWinesContextValue'

type WineLikeButtonProps = {
  wineId: string
  wineName: string
}

function WineLikeButton({ wineId, wineName }: WineLikeButtonProps) {
  const { isLiked, toggleLike } = useLikedWines()
  const liked = isLiked(wineId)

  return (
    <button
      type="button"
      aria-label={liked ? `${wineName} 좋아요 취소` : `${wineName} 좋아요`}
      aria-pressed={liked}
      onClick={() => toggleLike(wineId)}
      className="flex size-6 items-center justify-center"
    >
      <img src={liked ? heartFilledIcon : heartEmptyIcon} alt="" className="size-[19px]" />
    </button>
  )
}

export default WineLikeButton
