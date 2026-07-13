import { NavLink } from 'react-router-dom'

const tabs = [{ to: '/', label: '홈' }]

function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-10 border-t border-white/10 bg-stone-950/80 backdrop-blur-md">
      <ul className="flex">
        {tabs.map((tab) => (
          <li key={tab.to} className="flex-1">
            <NavLink
              to={tab.to}
              end
              className={({ isActive }) =>
                `block py-3 text-center text-sm font-medium ${
                  isActive ? 'text-amber-300' : 'text-stone-400'
                }`
              }
            >
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default BottomNav
