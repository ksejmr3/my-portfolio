import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/about-section.css'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

const aboutItems = [
  {
    keyword: 'ABOUT ME',
    question: '문제를 화면으로 옮길 때 어떤 역할을 하나요?',
    answer: '요구사항과 콘텐츠의 우선순위를 정리하고, 그 기준이 정보 구조와 인터랙션으로 이어지도록 설계합니다. 구현 단계에서는 의도한 흐름이 브라우저에서도 유지되는지 직접 확인합니다.',
  },
  {
    keyword: 'MY APPROACH',
    question: '작업을 시작할 때 무엇부터 정리하나요?',
    answer: '제공된 자료와 요구사항을 기능·콘텐츠·제약 조건으로 나눕니다. 이후 사용자가 먼저 알아야 할 정보와 다음 행동을 기준으로 페이지 순서를 정합니다.',
  },
  {
    keyword: 'TEAMWORK',
    question: '팀 프로젝트에서 어떻게 기여했나요?',
    answer: '현대 모터스튜디오 4인 팀 프로젝트에서 UX 구조 정리에 참여하고, Experience Finder STEP 1–3과 전시 서브페이지를 디자인·구현했습니다. 지점별 소개는 초기 구조와 통합 작업을 지원했으며, 브랜치와 PR 단위로 변경사항을 공유했습니다.',
  },
  {
    keyword: 'DESIGN & CODE',
    question: '디자인을 구현하면서 어떤 기준이 생겼나요?',
    answer: '정적인 시안만으로는 전환 시점, 긴 문장의 줄바꿈과 작은 화면의 조작 상태까지 설명하기 어렵다는 점을 확인했습니다. 그래서 설계 단계부터 반응형 조건과 상태 변화를 함께 기록합니다.',
  },
  {
    keyword: 'NEXT STEP',
    question: '앞으로 어떤 역량을 더 발전시키고 싶나요?',
    answer: '리서치와 콘텐츠 구조를 시각적인 화면으로 정리하고, 개발자와 공유할 수 있는 상태·반응형 기준까지 구체적으로 설명하는 역량을 발전시키고 싶습니다.',
  },
]

export default function AboutSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(min-width: 1101px) and (prefers-reduced-motion: no-preference)', () => {
        const items = [...section.querySelectorAll('.about-section__item')]
        if (items.length < 2) return undefined
        gsap.set(items.slice(1), { xPercent: 42, clipPath: 'inset(0 0 0 100%)' })
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * 3.2}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        items.slice(1).forEach((item, index) => {
          timeline.to(item, {
            xPercent: 0,
            clipPath: 'inset(0 0 0 0%)',
            duration: 0.8,
            ease: 'none',
          }, index * 0.95)
        })
        timeline.to({}, { duration: 0.65 })
        return () => timeline.kill()
      })
      return () => media.revert()
    }, section)
    return () => context.revert()
  }, [])

  return (
    <section className="about-section" id="about" aria-labelledby="about-title" ref={sectionRef}>
      <div className="about-section__inner">
        <header className="about-section__intro">
          <p className="about-section__eyebrow">WORKING NOTES / 2026</p>
          <h2 id="about-title">ABOUT</h2>
          <p className="about-section__summary">
            요구사항을 구조화하고, 팀과 기준을 공유하며, 구현 화면을 다시 검수하는 방식으로 작업합니다.
          </p>
          <p className="about-section__signature">OBSERVE · ORGANIZE · COMMUNICATE · MAKE</p>
        </header>

        <ol className="about-section__list" onMouseLeave={(event) => {
          if (!event.currentTarget.contains(document.activeElement)) setOpenIndex(0)
        }}>
          {aboutItems.map((item, index) => (
            <li
              className={`about-section__item${openIndex === index ? ' is-open' : ''}`}
              key={item.question}
              onMouseEnter={(event) => {
                if (!event.currentTarget.parentElement.contains(document.activeElement)) setOpenIndex(index)
              }}
              onFocusCapture={() => setOpenIndex(index)}
            >
              <button className="about-section__trigger" type="button" aria-label={item.question} aria-expanded={openIndex === index} aria-controls={`about-answer-${index}`} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                <span className="about-section__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="about-section__keyword" aria-hidden="true">{item.keyword}</span>
                <span className="about-section__question" aria-hidden="true">{item.question}</span>
              </button>
              <div className="about-section__answer" id={`about-answer-${index}`} aria-hidden={openIndex !== index}>
                <p>{item.answer}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
