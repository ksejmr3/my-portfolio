import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ImageLightbox from '../components/ImageLightbox.jsx'
import implementedHero from '../assets/vivienne-westwood/implemented-hero.png'
import heroPoster from '../assets/vivienne-westwood/hero-poster.jpeg'
import heritage from '../assets/vivienne-westwood/expertise-heritage.png'
import craftsmanship from '../assets/vivienne-westwood/expertise-craftsmanship.png'
import rebellion from '../assets/vivienne-westwood/expertise-rebellion.png'
import projectOne from '../assets/vivienne-westwood/project-01.png'
import projectThree from '../assets/vivienne-westwood/project-03.png'
import projectFour from '../assets/vivienne-westwood/project-04.png'
import projectSix from '../assets/vivienne-westwood/project-06.png'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

const visualDecisions = [
  { number: '01', title: 'HERITAGE', copy: '역사적 테일러링과 영국식 헤리티지를 이미지의 질감과 여백으로 해석했습니다.', image: heritage, position: 'start' },
  { number: '02', title: 'CRAFTSMANSHIP', copy: '제작 과정과 조형적인 실루엣이 읽히도록 인물과 디테일의 크롭을 달리했습니다.', image: craftsmanship, position: 'center' },
  { number: '03', title: 'REBELLION', copy: '검정·아이보리 위에 버건디를 제한적으로 사용해 반항적인 태도를 강조했습니다.', image: rebellion, position: 'end' },
]

const projectImages = [
  { src: projectOne, alt: '타탄과 오브 주얼리를 사용한 Vivienne Westwood 프로젝트 이미지', label: 'TARTAN / ORB', className: 'vivienne-case__key-image--tartan' },
  { src: projectThree, alt: '의상을 제작하는 아틀리에 장면', label: 'ATELIER / CRAFT', className: 'vivienne-case__key-image--atelier' },
  { src: projectFour, alt: '그래픽 벽 앞의 Vivienne Westwood 캠페인 이미지', label: 'CAMPAIGN / REBELLION', className: 'vivienne-case__key-image--campaign' },
  { src: projectSix, alt: '아이보리 드레스의 Vivienne Westwood 런웨이 이미지', label: 'RUNWAY / SILHOUETTE', className: 'vivienne-case__key-image--runway' },
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
          .fromTo('.vivienne-case__key-image--tartan, .vivienne-case__key-image--runway', { yPercent: 12 }, { yPercent: -8, ease: 'none' }, 0)
          .fromTo('.vivienne-case__key-image--atelier, .vivienne-case__key-image--campaign', { yPercent: -6 }, { yPercent: 8, ease: 'none' }, 0))
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
      <p className="vivienne-case__intent-statement">TRADITION DOES NOT HAVE TO LOOK <em>OBEDIENT.</em></p>
      <div className="vivienne-case__intent-detail"><h3 id="vivienne-intent-title">HERITAGE,<br />RECOMPOSED.</h3><p>원본 Figma와 React 구현은 Barlow Condensed의 선언적인 제목, Work Sans의 정보 텍스트, Lora Italic의 대비를 사용합니다. V2에서는 이 결과물을 다시 복제하지 않고, 서로 다른 타이포 계층과 이미지 크롭을 선택한 디자인 의도로 설명합니다.</p></div>
      <figure className="vivienne-case__intent-poster editorial-media"><img src={heroPoster} alt="Vivienne Westwood 프로젝트 Hero에 사용한 런웨이 포스터" /><figcaption>ORIGINAL CAMPAIGN ASSET / HERO POSTER</figcaption></figure>
    </section>

    <section className="vivienne-case__visual editorial-scene editorial-scene--burgundy" aria-labelledby="vivienne-visual-title">
      <Meta index="03">VISUAL SYSTEM</Meta>
      <h3 className="editorial-display" id="vivienne-visual-title">THREE WAYS<br /><em>TO HOLD A HOUSE.</em></h3>
      <div className="vivienne-case__decision-list">{visualDecisions.map((item) => <figure className={`vivienne-case__decision vivienne-case__decision--${item.position}`} key={item.number}><div className="editorial-media"><img src={item.image} alt={`${item.title} 디자인 방향에 사용한 원본 프로젝트 이미지`} /></div><figcaption><span>{item.number}</span><h4>{item.title}</h4><p>{item.copy}</p></figcaption></figure>)}</div>
      <div className="vivienne-case__palette" aria-label="프로젝트 컬러 시스템"><span>#111111</span><span>#F8F8F8</span><span>#651F2A</span><span>#C1121F</span></div>
    </section>

    <section className="vivienne-case__key-screens editorial-scene editorial-scene--dark" aria-labelledby="vivienne-key-title">
      <Meta index="04">KEY SCREENS / FIGMA DIRECTION</Meta>
      <h3 className="vivienne-case__key-word" id="vivienne-key-title" aria-label="Selected projects">SELECTED</h3>
      <div className="vivienne-case__key-layout">{projectImages.map((image) => <button className={`vivienne-case__key-image ${image.className} editorial-media`} type="button" key={image.label} onClick={() => openImage({ src: image.src, alt: image.alt, label: image.label, title: 'FIGMA VISUAL SOURCE / SELECTED PROJECTS' })}><img src={image.src} alt={image.alt} /><span>{image.label} <b>EXPAND ↗</b></span></button>)}</div>
      <p className="editorial-caption vivienne-case__key-copy">Figma의 Selected Projects 부채꼴 구성에서 이미지의 중첩과 중심 집중만 가져왔습니다. 화면 자체를 카드 캐러셀로 복제하지 않고, 실제 시각 자산을 서로 다른 크기와 깊이로 배치했습니다.</p>
    </section>

    <section className="vivienne-case__implementation editorial-scene editorial-scene--paper" aria-labelledby="vivienne-implementation-title">
      <Meta index="05">IMPLEMENTATION</Meta>
      <div className="vivienne-case__implementation-heading"><h3 className="editorial-display" id="vivienne-implementation-title">DESIGNED<br /><em>THEN BUILT.</em></h3><p>React와 Vite로 13개의 정적 섹션을 컴포넌트화했습니다. 현재 원본 저장소에서 확인된 것은 정적 데스크톱 구현이며, Hero 재생·캐러셀·Selected Projects 상세 전환은 구현되지 않은 상태입니다.</p></div>
      <div className="vivienne-case__implementation-facts"><article><span>01</span><h4>COMPONENT STRUCTURE</h4><p>Header부터 Footer까지 섹션별 React 컴포넌트로 분리했습니다.</p></article><article><span>02</span><h4>LOCAL ASSETS</h4><p>프로젝트 이미지와 Barlow Condensed·Work Sans·Lora 로컬 폰트를 사용했습니다.</p></article><article><span>03</span><h4>CONFIRMED STATE</h4><p>1920px 기준 정적 레이아웃과 hover 시안은 확인되며, 동적 기능은 별도 구현되지 않았습니다.</p></article></div>
    </section>

    <footer className="vivienne-case__closing editorial-scene editorial-scene--dark"><Meta index="06">PROJECT CLOSING</Meta><p className="vivienne-case__closing-title">A DIGITAL HOUSE<br /><em>WITH AN ATTITUDE.</em></p><div><p>브랜드의 시각 언어를 해석하고, Figma 설계를 React의 실제 화면 구조로 옮긴 개인 리디자인 프로젝트입니다.</p><span>NEXT PROJECT / COS ↓</span></div></footer>
    {activeImage && <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />}
  </article>
}
