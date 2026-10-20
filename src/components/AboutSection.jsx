import '../styles/about-section.css'

const aboutItems = [
  {
    question: '어떤 디자이너인가요?',
    answer: '화면의 시각적 완성도와 사용 흐름, 실제 구현까지 함께 고민하는 디자이너입니다. 콘텐츠가 읽히는 순서와 인터랙션의 자연스러움을 중요하게 생각합니다.',
  },
  {
    question: '작업을 시작할 때 가장 중요하게 생각하는 것은 무엇인가요?',
    answer: '요구사항과 콘텐츠를 먼저 모아 사용자가 필요한 정보와 우선순위를 정리합니다. 그 기준을 바탕으로 페이지 구조와 다음 행동이 자연스럽게 이어지는지 살펴봅니다.',
  },
  {
    question: '팀 프로젝트에서 어떤 역할을 했나요?',
    answer: '4인 현대 모터스튜디오 프로젝트에서 UX 구조를 함께 정리하고, 경험 찾기 STEP 1–3과 전시 서브페이지 디자인·구현을 맡았습니다. 지점 소개는 담당 팀원의 작업을 지원해 초기 구조와 구현 기반을 보탰으며, Git으로 변경사항을 나누어 작업했습니다.',
  },
  {
    question: '디자인과 구현을 함께 경험하며 무엇을 배웠나요?',
    answer: 'Figma에서 정한 간격과 상태가 브라우저에서도 의도대로 유지되는지 직접 확인하게 됐습니다. 작은 화면 차이도 가독성과 조작에 영향을 주기 때문에, 설계 단계부터 반응형 조건을 함께 살핍니다.',
  },
  {
    question: '앞으로 어떤 디자이너로 성장하고 싶나요?',
    answer: '디자인 의도를 실제 웹 환경에서도 일관되게 구현하고, 사용자 경험과 기술적 조건을 함께 고려할 수 있는 디자이너로 성장하고 싶습니다.',
  },
]

export default function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-section__inner">
        <header className="about-section__intro">
          <p className="about-section__eyebrow">WORKING NOTES / 2026</p>
          <h2 id="about-title">ABOUT</h2>
          <p className="about-section__summary">
            관찰한 내용을 기준으로 공유하고, 구현 결과를 다시 살펴 다음 작업의 방향을 구체화합니다.
          </p>
          <p className="about-section__signature">OBSERVE · ORGANIZE · COMMUNICATE · MAKE</p>
        </header>

        <ol className="about-section__list">
          {aboutItems.map((item, index) => (
            <li
              className="about-section__item"
              key={item.question}
              style={{ '--about-stack-top': `${76 + index * 58}px`, '--about-stack-z': index + 1 }}
            >
              <span className="about-section__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div className="about-section__copy">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
