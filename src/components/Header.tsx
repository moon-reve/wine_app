import bellIcon from '../assets/bell.svg'
import searchIcon from '../assets/search.svg'

function Header() {
  return (
    <header
      className="flex w-full items-center justify-between px-5 pt-4.5 pb-3"
      data-node-id="577:105"
    >
      <p
        className="font-playfair shrink-0 text-xl leading-none font-normal tracking-[-0.4px] whitespace-nowrap text-white"
        data-node-id="577:106"
      >
        Wine Sippers
      </p>

      <div className="flex shrink-0 items-center gap-1 overflow-hidden" data-node-id="577:107">
        <button
          type="button"
          aria-label="Search"
          className="flex h-10 w-8.5 shrink-0 items-center justify-center overflow-hidden"
          data-node-id="577:108"
        >
          <img src={searchIcon} alt="" className="size-7 shrink-0" data-node-id="577:109" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-8.5 shrink-0 items-center justify-center overflow-hidden"
          data-node-id="577:112"
        >
          <img src={bellIcon} alt="" className="size-6.75 shrink-0" data-node-id="577:113" />
        </button>
      </div>
    </header>
  )
}

export default Header
