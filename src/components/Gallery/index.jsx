import { useEffect, useState } from 'react';
import arrowLeft from '../../assets/arrow-left.svg';
import arrowRight from '../../assets/arrow-right.svg';
import './Gallery.css';

function normalizeSize(value) {
  if (!value) return undefined;
  return /^\d+$/.test(String(value)) ? `${value}px` : value;
}

function Gallery({
  className = '',
  width,
  height,
  radius = '0px',
  showThumbs = false,
  images = [],
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const total = images.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= total - 1;

  function handlePrev() {
    if (!isFirst) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function handleNext() {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  const stageStyle = {
    width: normalizeSize(width),
    height: normalizeSize(height),
    borderRadius: radius,
  };

  return (
    <div className={`gallery ${className}`.trim()}>
      <div className="gallery-stage" style={stageStyle}>
        <div
          className="gallery-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((item, index) => (
            <div className="gallery-slide" key={`${item.src}-${index}`}>
              <img src={item.src} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="gallery-arrow gallery-arrow--left"
          onClick={handlePrev}
          disabled={isFirst}
          aria-label="Imagem anterior"
        >
          <img src={arrowLeft} alt="" width={14} height={24} />
        </button>

        <button
          type="button"
          className="gallery-arrow gallery-arrow--right"
          onClick={handleNext}
          disabled={isLast || total === 0}
          aria-label="Próxima imagem"
        >
          <img src={arrowRight} alt="" width={14} height={24} />
        </button>

        {!showThumbs && total > 1 && (
          <div className="gallery-dots" aria-label="Paginação do slide">
            {images.map((_, index) => (
              <button
                type="button"
                key={`dot-${index}`}
                className={`gallery-dot ${index === currentIndex ? 'is-active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {showThumbs && total > 0 && (
        <div className="gallery-thumbs">
          {images.map((item, index) => (
            <button
              type="button"
              key={`thumb-${item.src}-${index}`}
              className={`gallery-thumb ${index === currentIndex ? 'is-active' : ''}`}
              style={{ borderRadius: radius }}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Selecionar imagem ${index + 1}`}
            >
              <img src={item.src} alt={`Miniatura ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
