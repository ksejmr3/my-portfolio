import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ImageLightbox from '../components/ImageLightbox.jsx'
import implementedHero from '../assets/vivienne-westwood/implemented-hero.png'
import heroPoster from '../assets/vivienne-westwood/hero-poster.jpeg'
import heritage from '../assets/vivienne-westwood/expertise-heritage.png'
import craftsmanship from '../assets/vivienne-westwood/expertise-craftsmanship.png'
import rebellion from '../assets/vivienne-westwood/expertise-rebellion.png'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

const visualDecisions = [
  { number: '01', title: 'TYPE AS STRUCTURE', copy: 'Figma와 React에서 확인되는 Condensed 제목을 화면의 기준선으로 사용해, 첫 화면에서 메시지의 위계를 먼저 만들었습니다.', image: heritage, position: 'start' },
  { number: '02', title: 'ASYMMETRY AS RHYTHM', copy: '포스터·텍스트·이미지가 같은 중심에 정렬되지 않도록 배치해, 스크롤 중 시선이 한 방향으로 고정되지 않게 했습니다.', image: craftsmanship, position: 'center' },
  { number: '03', title: 'LIMITED COLOUR', copy: '원본 Figma와 코드에서 확인되는 검정·아이보리·버건디·레드만 사용해 이미지와 제목 사이의 대비를 유지했습니다.', image: rebellion, position: 'end' },
]

function Meta({ index, children }) {
  return <p className="editorial-meta"><span>{index}</span><span>{children}</span></p>
}

export default function VivienneCaseStudy() {
  const sectionRef = useRef(null)
  const [activeImage, setActiveImage] = useState(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const animations = []
        animations.push(gsap.timeline({ scrollTrigger: { trigger: '.vivienne-case__overview', start: 'top 62%', end: 'bottom 18%', scrub: true, invalidateOnRefresh: true } })
          .fromTo('.vivienne-case__title-line--top', { xPercent: 0 }, { xPercent: -16, ease: 'none' }, 0)
          .fromTo('.vivienne-case__title-line--bottom', { xPercent: 0 }, { xPercent: 13, ease: 'none' }, 0)
          .fromTo('.vivienne-case__result-frame', { yPercent: 12, scale: .88, rotate: 3 }, { yPercent: -4, scale: 1, rotate: 0, ease: 'none' }, 0))
        animations.push(gsap.timeline({ scrollTrigger: { trigger: '.vivienne-case__key-screens', start: 'top 78%', end: 'bottom 22%', scrub: true, invalidateOnRefresh: true } })
          .fromTo('.vivienne-case__key-word', { xPercent: 18 }, { xPercent: -16, ease: 'none' }, 0)
          .fromTo('.vivienne-case__key-ui-frame', { yPercent: 12, rotate: -3, scale: .9 }, { yPercent: -5, rotate: 0, scale: 1, ease: 'none' }, 0)
          .fromTo('.vivienne-case__key-evidence', { yPercent: -10 }, { yPercent: 7, ease: 'none' }, 0))
        const refresh = () => ScrollTrigger.refresh()
        const pendingImages = [...sectionRef.current.querySelectorAll('img')].filter((image) => !image.complete)
        pendingImages.forEach((image) => image.addEventListener('load', refresh, { once: true }))
        const frame = requestAnimationFrame(refresh)
        return () => { cancelAnimationFrame(frame); pendingImages.forEach((image) => image.removeEventListener('load', refresh)); animations.forEach((animation) => animation.kill()) }
      })
      return () => media.revert()
    }, sectionRef)
    return () => context.revert()
  }, [])

  const openImage = (image) => setActiveImage(image)

  return <article className="vivienne-case editorial-system" id="vivienne-case-study" aria-label="Vivienne Westwood redesign case study" ref={sectionRef}>
    <section className="vivienne-case__overview editorial-scene editorial-scene--dark" aria-labelledby="vivienne-title">
      <Meta index="01">PROJECT OVERVIEW</Meta>
      <h2 className="editorial-display vivienne-case__title" id="vivienne-title"><span className="vivienne-case__title-line vivienne-case__title-line--top">VIVIENNE</span><span className="vivienne-case__title-line vivienne-case__title-line--bottom"><em>WESTWOOD.</em></span></h2>
      <p className="editorial-caption vivienne-case__overview-copy">개인 웹사이트 리디자인 프로젝트. 브랜드의 헤리티지와 반항적인 태도를 초대형 타이포, 비대칭 이미지, 절제된 컬러로 재해석했습니다.</p>
      <button className="vivienne-case__result-frame editorial-media" type="button" onClick={() => openImage({ src: implementedHero, alt: 'Vivienne Westwood React 구현 Hero 화면', label: 'REACT IMPLEMENTATION', title: 'BREAK THE RULES / REMAKE FASHION' })}><img src={implementedHero} alt="Vivienne Westwood React 구현 Hero 화면" /><span>REACT IMPLEMENTATION / HERO <b>EXPAND ↗</b></span></button>
    </section>

    <section className="vivienne-case__intent editorial-scene editorial-scene--paper" aria-labelledby="vivienne-intent-title">
      <Meta index="02">DESIGN INTENT</Meta>
      <p className="vivienne-case__intent-statement">TYPE SETS<br />THE <em>ATTITUDE.</em></p>
      <div className="vivienne-case__intent-detail"><h3 id="vivienne-intent-title">A SITE WITH<br />A POINT OF VIEW.</h3><p>원본 Figma와 React 구현에서 확인되는 Barlow Condensed 제목, Work Sans 정보 텍스트, Lora Italic의 대비를 사용했습니다. 검정·아이보리·버건디와 비대칭 포스터 배치는 브랜드를 설명하기 위한 장식이 아니라, 첫 화면의 긴장과 읽는 순서를 설계한 결정입니다.</p></div>
      <figure className="vivienne-case__intent-poster editorial-media"><img src={heroPoster} alt="Vivienne Westwood 프로젝트 Hero에 사용한 원본 캠페인 포스터" /><figcaption>BRAND IMAGE SOURCE / USED IN THE PROJECT HERO</figcaption></figure>
    </section>

    <section className="vivienne-case__visual editorial-scene editorial-scene--burgundy" aria-labelledby="vivienne-visual-title">
      <Meta index="03">VISUAL SYSTEM</Meta>
      <h3 className="editorial-display" id="vivienne-visual-title">ONE VISUAL<br /><em>LANGUAGE.</em></h3>
      <div className="vivienne-case__decision-list">{visualDecisions.map((item) => <figure className={`vivienne-case__decision vivienne-case__decision--${item.position}`} key={item.number}><div className="editorial-media"><img src={item.image} alt={`${item.title} 디자인 방향에 사용한 원본 프로젝트 이미지`} /></div><figcaption><span>{item.number}</span><h4>{item.title}</h4><p>{item.copy}</p></figcaption></figure>)}</div>
      <div className="vivienne-case__palette" aria-label="프로젝트 컬러 시스템"><span>#111111</span><span>#F8F8F8</span><span>#651F2A</span><span>#C1121F</span></div>
    </section>

    <section className="vivienne-case__key-screens editorial-scene editorial-scene--dark" aria-labelledby="vivienne-key-title">
      <Meta index="04">KEY SCREENS / FIGMA DIRECTION</Meta>
      <h3 className="vivienne-case__key-word" id="vivienne-key-title">THE RESULT</h3>
      <div className="vivienne-case__key-layout">
        <button className="vivienne-case__key-ui-frame editorial-media" type="button" onClick={() => openImage({ src: implementedHero, alt: 'Vivienne Westwood React 구현 Hero 화면', label: 'REACT IMPLEMENTATION', title: 'BREAK THE RULES / REMAKE FASHION' })}><img src={implementedHero} alt="Vivienne Westwood React 구현 Hero 화면" /><span>01 / HERO — REACT IMPLEMENTATION <b>EXPAND ↗</b></span></button>
        <div className="vivienne-case__key-evidence"><span>CONFIRMED UI</span><p>현재 확보된 실제 구현 UI는 Hero 화면입니다. Latest Collection, House Objects, Selected Projects, House Codes, Editorial은 원본 React 코드에서 정적 섹션으로 확인했지만 별도 구현 화면 export는 확보되지 않아 UI 결과물처럼 대체 표시하지 않았습니다.</p></div>
      </div>
      <p className="editorial-caption vivienne-case__key-copy">Figma의 큰 제목과 중첩 원리를 이 포트폴리오의 편집형 장면에 적용했습니다. 이 화면은 브랜드 사진이 아니라 사용자가 React로 구현한 실제 웹사이트 Hero 결과입니다.</p>
    </section>

    <section className="vivienne-case__implementation editorial-scene editorial-scene--paper" aria-labelledby="vivienne-implementation-title">
      <Meta index="05">IMPLEMENTATION</Meta>
      <div className="vivienne-case__implementation-heading"><h3 className="editorial-display" id="vivienne-implementation-title">DESIGNED<br /><em>THEN BUILT.</em></h3><p>React와 Vite로 Header부터 Footer까지 13개 정적 섹션을 컴포넌트화했습니다. Figma의 Selected Projects hover는 설계 시안이며, 원본 React에서 Hero 재생·캐러셀·Selected Projects 상세 전환은 실제로 구현되지 않았습니다.</p></div>
      <div className="vivienne-case__implementation-facts"><article><span>01</span><h4>FIGMA → REACT</h4><p>1920px 기준 Figma 레이아웃을 섹션별 React 컴포넌트와 CSS로 옮겼습니다.</p></article><article><span>02</span><h4>STATIC UI</h4><p>Hero와 12개 후속 화면은 정적 레이아웃으로 구현되어 있으며, 메뉴와 상태 요소도 현재는 정적 표현입니다.</p></article><article><span>03</span><h4>RESPONSIVE SCOPE</h4><p>원본 확인 범위는 데스크톱 캔버스입니다. 모바일 전용 Figma 사양과 동적 기능 정의는 별도 자료가 필요합니다.</p></article></div>
    </section>

    <footer className="vivienne-case__closing editorial-scene editorial-scene--dark"><Meta index="06">PROJECT CLOSING</Meta><p className="vivienne-case__closing-title">A DIGITAL HOUSE<br /><em>WITH AN ATTITUDE.</em></p><div><p>브랜드의 시각 언어를 해석하고, Figma 설계를 React의 실제 화면 구조로 옮긴 개인 리디자인 프로젝트입니다.</p><span>NEXT PROJECT / COS ↓</span></div></footer>
    {activeImage && <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />}
  </article>
}
