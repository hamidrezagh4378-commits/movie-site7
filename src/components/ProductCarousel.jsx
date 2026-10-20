import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import { Icon } from './ui.jsx';

/* Horizontally scrollable, drag/swipeable product carousel with arrow controls. */
export default function ProductCarousel({ products, ariaLabel = 'Product carousel' }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const drag = useRef({ active: false, startX: 0, scrollStart: 0, moved: false });

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    el?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el?.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [products]);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(':scope > *');
    const w = card ? card.getBoundingClientRect().width + 22 : 320;
    el.scrollBy({ left: dir * w * (el.clientWidth > 900 ? 2 : 1), behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, scrollStart: el.scrollLeft, moved: false };
    el.classList.add('is-dragging');
  };
  const onPointerMove = (e) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollStart - dx;
  };
  const endDrag = () => {
    const el = trackRef.current;
    drag.current.active = false;
    el?.classList.remove('is-dragging');
  };

  // Prevent child links from firing after a drag gesture
  const onClickCapture = (e) => {
    if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; }
  };

  return (
    <div className="carousel" role="region" aria-label={ariaLabel}>
      <div
        ref={trackRef}
        className="carousel__track"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); scrollBy(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); scrollBy(-1); } }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      <div className="carousel__arrows" style={{ position: 'absolute', top: -66, right: 0 }}>
        <button className="carousel__arrow" aria-label="Previous products" disabled={!canPrev} onClick={() => scrollBy(-1)}><Icon name="chevronLeft" /></button>
        <button className="carousel__arrow" aria-label="Next products" disabled={!canNext} onClick={() => scrollBy(1)}><Icon name="chevronRight" /></button>
      </div>
    </div>
  );
}
