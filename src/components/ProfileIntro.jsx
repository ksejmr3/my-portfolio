export default function ProfileIntro() {
  return (
    <section className="profile-intro" aria-labelledby="profile-intro-title">
      <div className="profile-intro__layout">
        <figure className="profile-intro__portrait">
          <img src="/images/profile/profile-portrait.jpg.jpg" alt="김지영 프로필 사진" />
        </figure>
        <div className="profile-intro__content">
          <p className="profile-intro__meta">PROFILE INTRO / 2026</p>
          <h2 id="profile-intro-title">KIM<br />JIYOUNG</h2>
          <p className="profile-intro__roles">WEB DESIGNER<span>UI/UX DESIGN</span></p>
          <p className="profile-intro__summary">브랜드의 특성과 사용자의 경험을 고려해<br />기획부터 디자인까지 연결하는 웹디자이너입니다.</p>
        </div>
      </div>
    </section>
  )
}
