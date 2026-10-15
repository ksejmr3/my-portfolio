import { useEffect, useState } from 'react'
import IntroSection from './components/IntroSection.jsx'
import WorkSection from './components/WorkSection.jsx'
import HyundaiCaseStudy from './pages/HyundaiCaseStudy.jsx'

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname)
      window.setTimeout(() => window.scrollTo(0, window.history.state?.scrollY ?? 0), 0)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (to, { work = false } = {}) => {
    window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '', window.location.pathname)
    window.history.pushState({ scrollY: 0 }, '', to)
    setPathname(to)
    window.setTimeout(() => {
      if (work) document.getElementById('work')?.scrollIntoView({ block: 'start' })
      else window.scrollTo(0, 0)
    }, 0)
  }

  if (pathname === '/work/hyundai-motorstudio') {
    return <HyundaiCaseStudy onBackToWork={() => navigate('/', { work: true })} />
  }

  return <main><IntroSection /><WorkSection onNavigate={navigate} /></main>
}
