import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/about-section.css'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

const aboutItems = [
  {
    keyword: 'ABOUT ME',
    question: '저는 어떤 사람인가요?',
    answer: '주변을 관찰하고 생각을 정리하는 데 시간을 쓰는 편입니다. 무언가를 진행할 때는 큰 방향뿐 아니라 작은 부분까지 확인하려고 합니다.',
  },
  {
    keyword: 'MY VALUES',
    question: '무엇을 중요하게 생각하나요?',
    answer: '눈에 보이는 결과뿐 아니라 그 결과에 이르는 과정도 중요하게 생각합니다. 맡은 일을 책임 있게 이어가고, 작은 부분까지 꼼꼼히 확인하며 꾸준히 개선하려고 합니다.',
  },
  {
    keyword: 'COMMUNICATION',
    question: '사람들과 어떻게 소통하나요?',
    answer: '상대방의 요청과 의도를 먼저 이해하려고 합니다. 필요한 내용을 정리해 명확하게 전달하고, 서로 이해한 내용이 같은지 확인하는 방식을 선호합니다.',
  },
  {
    keyword: 'CURIOSITY',
    question: '어떤 것에 관심이 있나요?',
    answer: '새로운 시각적 표현과 디자인, 콘텐츠 제작에 관심이 있습니다. 익숙하지 않은 표현을 접하면 어떤 생각과 과정에서 나왔는지 살펴보게 됩니다.',
  },
  {
    keyword: 'NEXT STEP',
    question: '앞으로 어떤 사람으로 성장하고 싶나요?',
    answer: '익숙한 방식에만 머무르지 않고 새로운 경험을 통해 시야를 넓혀가고 싶습니다. 배운 것을 다시 살피며 저만의 관점도 천천히 만들어가고 싶습니다.',
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
        gsap.set(items.slice(1), { autoAlpha: 0, y: 18 })
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
            autoAlpha: 1,
            y: 0,
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
            자세히 보고, 생각을 정리하고, 필요한 말을 분명히 전하려고 합니다.
          </p>
          <p className="about-section__signature">OBSERVE · THINK · COMMUNICATE · GROW</p>
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
