import { useDesktopViewport } from '../hooks/useDesktopViewport'
import DesktopGuide from './DesktopGuide'
import Splash from './Splash'

function ResponsiveEntry() {
  const isDesktop = useDesktopViewport()

  return isDesktop ? <DesktopGuide /> : <Splash />
}

export default ResponsiveEntry
