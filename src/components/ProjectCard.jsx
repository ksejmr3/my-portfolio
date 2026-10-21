export default function ProjectCard({ project }) {
  return (
    <article className={`project-card project-card--${project.id}`} id={project.id} aria-labelledby={`${project.id}-title`}>
      <div className="project-card__media">
        {project.image ? <figure className={`project-card__figure project-card__figure--${project.visualKind}`}>
          <div className="project-card__visual">
            <img className="project-card__image" src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
            {project.secondaryImage && <img className="project-card__secondary-image" src={project.secondaryImage} alt={project.secondaryImageAlt} loading="lazy" decoding="async" />}
          </div>
          <figcaption>{project.imageNote}</figcaption>
        </figure> :
          <div className="project-card__pending" role="img" aria-label={`${project.name} 대표 이미지 자료 확보 필요`}><span>PROJECT VISUAL</span><strong>IMAGE<br />PENDING</strong><span>대표 이미지 자료 확보 필요</span></div>}
      </div>
      <div className="project-card__content">
        <div className="project-card__topline"><span>{project.number} / 03</span><span>SELECTED WORK</span></div>
        <div className="project-card__story"><p className="project-card__type">{project.type}</p><h3 id={`${project.id}-title`}>{project.name}</h3><p className="project-card__description">{project.description}</p>{project.id !== 'hyundai-motorstudio' && <span className="project-card__status">CASE STUDY / IN PREPARATION</span>}</div>
      </div>
    </article>
  )
}
