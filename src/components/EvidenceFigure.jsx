export default function EvidenceFigure({ image, onOpen, className = '' }) {
  return <figure className={`evidence-figure ${className}`}>
    <button className="evidence-figure__button" type="button" onClick={() => onOpen(image)} aria-label={`${image.label} 이미지 확대`}>
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      <span className="evidence-figure__expand" aria-hidden="true">VIEW ORIGINAL ↗</span>
    </button>
    <figcaption><span>{image.label}</span><span>{image.title}</span></figcaption>
    {image.summary && <p className="evidence-figure__summary">{image.summary}</p>}
  </figure>
}
