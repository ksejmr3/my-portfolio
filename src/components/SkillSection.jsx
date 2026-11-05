import { skillGroups } from '../data/skillTools.js'
import '../styles/skill-section.css'

export default function SkillSection() {
  return (
    <section className="skill-section" id="skill" aria-labelledby="skill-title">
      <div className="skill-section__stage">
        <header className="skill-section__header">
          <h2 id="skill-title">SKILL</h2>
          <p className="skill-section__description">디자인을 기획하고 화면으로 구현하는 과정에서 사용하는 도구와 기술입니다.</p>
        </header>
        <div className="skill-section__categories">
          {skillGroups.map((group) => (
            <section className="skill-section__category" key={group.name} aria-label={group.name + ' tools'}>
              <h3>{group.name}</h3>
              <ul>{group.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
