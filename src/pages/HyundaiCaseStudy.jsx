import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EvidenceFigure from '../components/EvidenceFigure.jsx'
import ImageLightbox from '../components/ImageLightbox.jsx'
import { hyundaiCaseStudy as project } from '../data/hyundaiCaseStudy.js'

function SectionIntro({ index, eyebrow, title, body }) {
  return <header className="case-section__intro"><span>{index}</span><div><p>{eyebrow}</p><h2>{title}</h2>{body && <p className="case-section__body">{body}</p>}</div></header>
}

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

export default function HyundaiCaseStudy() {
  const [activeImage, setActiveImage] = useState(null)
  const researchRef = useRef(null)
  const openImage = (image) => setActiveImage(image)
  const heroImage = { ...project.hero, label: 'FINAL UI / CURRENT BOARD', title: 'WIREFRAME & UI DESIGN' }

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const stage = researchRef.current
        const track = stage?.querySelector('.case-horizontal__track')
        if (!stage || !track) return undefined
        const animation = gsap.to(track, {
          x: () => -(track.scrollWidth - stage.clientWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${Math.max(track.scrollWidth - stage.clientWidth, 1)}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        const refresh = () => ScrollTrigger.refresh()
        const images = [...track.querySelectorAll('img')].filter((image) => !image.complete)
        images.forEach((image) => image.addEventListener('load', refresh, { once: true }))
        requestAnimationFrame(refresh)
        return () => {
          images.forEach((image) => image.removeEventListener('load', refresh))
          animation.kill()
        }
      })
      return () => media.revert()
    }, researchRef)
    return () => context.revert()
  }, [])

  return <section className="case-study case-study--hyundai" id="hyundai-case-study" aria-label="Hyundai Motorstudio project case study">
    <section className="case-hero" aria-labelledby="hyundai-title">
      <div className="case-hero__meta"><p>{project.type}</p><p>PERIOD / {project.period}</p><p>TEAM PROJECT</p></div>
      <h1 id="hyundai-title">HYUNDAI<br /><em>MOTORSTUDIO</em></h1>
      <div className="case-hero__bottom"><p>{project.overview}</p><span>SCROLL TO EXPLORE ↓</span></div>
      <EvidenceFigure image={heroImage} onOpen={openImage} className="case-hero__figure" />
    </section>

    <section className="case-section case-section--dark case-section--challenge">
      <SectionIntro index="02" eyebrow="CHALLENGE" title={<>FROM CONTENT DISCOVERY<br />TO A VISIT.</>} body="전시·시승·프로그램 정보가 분산된 흐름에서, 사용자가 관심 있는 경험을 찾고 지점·일정·예약 정보를 자연스럽게 확인하도록 하는 것이 목표였습니다." />
      <div className="case-problems"><p>01 <strong>공간의 정체성과 실제 경험을 온라인에서 이해하기 어려움</strong></p><p>02 <strong>방문 목적에 맞는 콘텐츠와 지점 정보를 찾기 어려움</strong></p><p>03 <strong>콘텐츠 탐색에서 예약까지의 흐름이 분산됨</strong></p></div>
    </section>

    <section className="case-section case-section--research" aria-labelledby="research-title">
      <SectionIntro index="03" eyebrow="RESEARCH" title={<>CONTEXT<br /><em>FIRST.</em></>} body="시장·브랜드 분석과 자사·경쟁사 조사를 통해 웹사이트가 전달해야 할 경험과 정보 구조의 개선 가설을 정리했습니다." />
      <div className="case-horizontal" ref={researchRef} aria-label="현대 모터스튜디오 리서치 보드">
        <div className="case-horizontal__track">{project.research.map((image, index) => <div className="case-horizontal__item" key={image.label}><span className="case-horizontal__index">0{index + 1} / 04</span><EvidenceFigure image={image} onOpen={openImage} /></div>)}</div>
      </div>
    </section>

    <section className="case-section case-section--warm case-section--insight" aria-labelledby="insight-title">
      <SectionIntro index="04" eyebrow="USER INSIGHT / PROBLEM DEFINITION" title={<>OBSERVE.<br /><em>DEFINE. DIRECT.</em></>} body="사용자 조사와 분석을 바탕으로 핵심 문제를 정리하고, 경험·콘텐츠·예약을 연결하는 UX 개선 방향을 설정했습니다." />
      <div className="case-insight-flow" aria-label="문제 정의와 UX 개선 방향">
        <div className="case-insight-flow__intro"><span>RESEARCH → PROBLEM → DIRECTION</span><p>조사 보드의 근거를 세 가지 문제와 대응 방향으로 연결했습니다.</p></div>
        <div className="case-insight-flow__items">{project.problemDirections.map((item) => <article className="case-insight-flow__item" key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p className="case-insight-flow__problem">{item.problem}</p><p className="case-insight-flow__direction"><b>DIRECTION</b>{item.direction}</p></article>)}</div>
      </div>
      <div className="case-evidence case-evidence--insight">{project.insight.map((image, index) => <EvidenceFigure image={image} onOpen={openImage} className={`case-evidence__item case-evidence__item--insight-${index + 1}`} key={image.label} />)}</div>
    </section>

    <section className="case-section case-section--structure" aria-labelledby="structure-title">
      <SectionIntro index="05" eyebrow="UX STRUCTURE" title={<>A STRUCTURE FOR<br />CHOOSING <em>AND GOING.</em></>} body="메뉴 구조, 사용자 흐름, 화면별 요구사항을 통해 원하는 콘텐츠를 찾고 예약까지 이어지는 경로를 정리했습니다." />
      <div className="case-evidence case-evidence--structure">{project.structure.map((image, index) => <EvidenceFigure image={image} onOpen={openImage} className={`case-evidence__item case-evidence__item--structure-${index + 1}`} key={image.label} />)}</div>
    </section>

    <section className="case-section case-section--dark case-section--visual" aria-labelledby="visual-title">
      <SectionIntro index="06" eyebrow="VISUAL DIRECTION" title={<>ONE VISUAL<br /><em>LANGUAGE.</em></>} body="스타일 가이드에서 확인된 타이포그래피, 색상, UI 기준을 바탕으로 화면 전반의 일관성을 정리했습니다." />
      <EvidenceFigure image={project.visual} onOpen={openImage} className="case-visual" />
    </section>

    <section className="case-section case-final" aria-labelledby="final-ui-title">
      <SectionIntro index="07" eyebrow="FINAL UI" title={<>THE EXPERIENCE,<br /><em>CONNECTED.</em></>} body="현재 확보된 보드는 와이어프레임과 UI 디자인을 함께 담고 있습니다. 독립된 최종 화면 export가 확보되면 이 영역을 화면별 사례로 확장할 예정입니다." />
      <EvidenceFigure image={heroImage} onOpen={openImage} className="case-final__figure" />
    </section>

    <footer className="case-closing"><div className="case-closing__message"><p>PROJECT SUMMARY</p><h2>경험을 찾고,<br /><em>방문을 계획하다.</em></h2><p>전시·시승·프로그램을 하나의 탐색 흐름으로 연결하고, 필요한 정보를 확인한 뒤 방문과 예약으로 이어지도록 설계했습니다.</p></div></footer>
    {activeImage && <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />}
  </section>
}
