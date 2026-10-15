import ProjectCard from './ProjectCard.jsx'
import { projects } from '../data/projects.js'

export default function WorkSection() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="work__opening">
        <div className="work__topline"><span>01 — 03</span><span>UX/UI · WEB REDESIGN</span></div>
        <h2 id="work-title">selected <em>works.</em></h2>
        <div className="work__opening-bottom"><p>조사와 해석에서 화면 설계까지.<br />세 가지 프로젝트를 소개합니다.</p><span>SCROLL TO EXPLORE ↓</span></div>
      </div>
      <div className="work__projects">{projects.map((project) => <ProjectCard project={project} key={project.id} />)}</div>
    </section>
  )
}
