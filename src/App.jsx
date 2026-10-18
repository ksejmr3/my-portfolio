import IntroSection from './components/IntroSection.jsx'
import IntroWorkSequence from './components/IntroWorkSequence.jsx'
import ProfileIntro from './components/ProfileIntro.jsx'
import WorkSection, { WorkOpening } from './components/WorkSection.jsx'

export default function App() {
  return (
    <main>
      <IntroWorkSequence intro={<IntroSection />} profile={<ProfileIntro />} opening={<WorkOpening />} />
      <WorkSection />
    </main>
  )
}
