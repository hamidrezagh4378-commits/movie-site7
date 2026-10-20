import React, { useEffect, useState } from 'react';
import { SmartImage } from './ui.jsx';

/* Product gallery: thumbnails, hover zoom, fullscreen lightbox with keyboard support. */
export default function ProductGallery({ images, productName }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => { setIndex(0); }, [productName]);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, images.length - 1));
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, images.length]);

  if (!images?.length) return null;

  return (
    <div className="gallery">
      <div
        className="gallery__main"
        role="button"
        tabIndex={0}
        aria-label={`Zoom image of ${productName}`}
        onClick={() => setLightbox(true)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLightbox(true)}
      >
        <SmartImage src={images[index]} alt={`${productName} — image ${index + 1} of ${images.length}`} eager={index === 0} />
      </div>
      {images.length > 1 && (
        <div className="gallery__thumbs" role="tablist" aria-label="Product images">
          {images.map((src, i) => (
            <button
              key={i}
              className={`gallery__thumb ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === index}
            >
              <SmartImage src={src} alt="" />
            </button>
          ))}
        </div>
      )}
      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${productName} fullscreen image`} onClick={() => setLightbox(false)}>
          <button className="lightbox__close" aria-label="Close fullscreen image" onClick={() => setLightbox(false)}>×</button>
          {images.length > 1 && (
            <>
              <button className="lightbox__nav lightbox__nav--prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setIndex((i) => Math.max(0, i - 1)); }}>‹</button>
              <button className="lightbox__nav lightbox__nav--next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); setIndex((i) => Math.min(images.length - 1, i + 1)); }}>›</button>
            </>
          )}
          <SmartImage src={images[index]} alt={`${productName} — fullscreen`} eager onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
