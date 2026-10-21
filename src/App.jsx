import IntroSection from './components/IntroSection.jsx'
import IntroWorkSequence from './components/IntroWorkSequence.jsx'
import ProfileIntro from './components/ProfileIntro.jsx'
import WorkSection, { WorkOpening } from './components/WorkSection.jsx'
import AIVideoContents from './components/AIVideoContents.jsx'
import CloneCodingSection from './components/CloneCodingSection.jsx'
import SkillSection from './components/SkillSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import PortfolioAssistant from './components/PortfolioAssistant.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'

export default function App() {
  return (
    <main>
      <SmoothScroll />
      <IntroWorkSequence intro={<IntroSection />} profile={<ProfileIntro />} opening={<WorkOpening />} />
      <WorkSection />
      <AIVideoContents />
      <CloneCodingSection />
      <SkillSection />
      <AboutSection />
      <ContactSection />
      <PortfolioAssistant />
    </main>
  )
}
