import HyundaiProjectPreview from './HyundaiProjectPreview.jsx'

export default function ProjectCard({ project }) {
  return (
    <article className={`project-card project-card--${project.id}`} id={project.id} aria-labelledby={`${project.id}-title`}>
      <div className="project-card__media">
        {project.id === 'hyundai-motorstudio' ? <HyundaiProjectPreview /> : project.image ? <figure className={`project-card__figure project-card__figure--${project.visualKind}`}>
          <div className="project-card__visual">
            <img className="project-card__image" src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
            {project.secondaryImage && <img className="project-card__secondary-image" src={project.secondaryImage} alt={project.secondaryImageAlt} loading="lazy" decoding="async" />}
          </div>
          <figcaption>{project.imageNote}</figcaption>
        </figure> :
          <div className="project-card__pending" role="img" aria-label={`${project.name} 대표 이미지 자료 확보 필요`}><span>PROJECT VISUAL</span><strong>IMAGE<br />PENDING</strong><span>대표 이미지 자료 확보 필요</span></div>}
      </div>
      <div className="project-card__content">
        <div className="project-card__story"><p className="project-card__type">{project.type}</p><h3 id={`${project.id}-title`}>{project.name}</h3><p className="project-card__description">{project.description}</p>{project.id === 'hyundai-motorstudio' ? <div className="project-card__links" aria-label="Hyundai Motorstudio project links">
          <a href="https://mbc-teamproject-wheat.vercel.app/" target="_blank" rel="noopener noreferrer"><span>LIVE WEBSITE</span><span aria-hidden="true">↗</span></a>
          <a href="https://www.figma.com/proto/jTT5VVONEzB9lonG6pUiFf/%EA%B9%80%EC%A7%80%EC%98%81_%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%9E%A5%ED%91%9C?node-id=1-32&p=f&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A32&page-id=0%3A1" target="_blank" rel="noopener noreferrer"><span>PROJECT DECK</span><span aria-hidden="true">↗</span></a>
        </div> : <span className="project-card__status">CASE STUDY / IN PREPARATION</span>}</div>
      </div>
    </article>
  )
}
