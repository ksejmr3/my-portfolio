import vivienneHero from '../assets/vivienne-westwood/implemented-hero.png'

export default function IntroSection() {
  return (
    <section className="intro" id="intro" aria-labelledby="intro-title">
      <div className="intro__stage">
      <header className="site-header">
        <a className="site-header__brand" href="#intro" aria-label="김지영 포트폴리오 처음으로">KIM JIYOUNG</a>
        <nav className="site-header__nav" aria-label="주요 메뉴"><a href="#intro" aria-current="page">INTRO</a><a href="#work">WORK</a></nav>
        <span className="site-header__edition">PORTFOLIO / 2026</span>
      </header>
      <div className="intro__canvas">
        <p className="intro__eyebrow intro__eyebrow--transition">KIM JIYOUNG — DESIGN PORTFOLIO</p>
        <h1 id="intro-title" className="intro__title"><span className="intro__title-line intro__title-line--primary">DESIGNING</span><span className="intro__title-line intro__title-line--secondary"><em>connected</em> EXPERIENCES.</span></h1>
        <p className="intro__summary intro__summary--transition">흩어진 정보를 정리하고,<br />사람과 경험을 자연스럽게 잇는 화면을 설계합니다.</p>
      </div>
      <div className="intro__bottom intro__bottom--transition">
        <div className="intro__index intro__index--transition"><span>01 / 03</span><span>SELECTED PROJECTS</span></div>
        <figure className="intro__preview intro__preview--transition"><img src={vivienneHero} alt="Vivienne Westwood 웹사이트 리디자인 구현 화면 미리보기" /><figcaption>VIVIENNE WESTWOOD / IMPLEMENTED HERO</figcaption></figure>
        <a className="intro__next" href="#work">EXPLORE WORK <span aria-hidden="true">↘</span></a>
      </div>
      <div className="intro__transition-plane" aria-hidden="true" />
      </div>
    </section>
  )
}
