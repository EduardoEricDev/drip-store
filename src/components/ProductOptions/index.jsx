import { useState } from 'react';
import './ProductOptions.css';

function ProductOptions({
  title,
  options = [],
  radius = '4px',
  shape = 'square',
  type = 'text',
  selected,
  onChange,
}) {
  const [internalSelected, setInternalSelected] = useState(options[0] ?? null);
  const currentSelected = selected !== undefined ? selected : internalSelected;

  function handleSelect(option) {
    if (selected === undefined) {
      setInternalSelected(option);
    }
    onChange?.(option);
  }

  return (
    <div className="product-options">
      {title && <span className="product-options-title">{title}</span>}

      <div className="product-options-list">
        {options.map((option) => {
          const isSelected = currentSelected === option;
          const style = {};

          if (shape === 'square') {
            style.borderRadius = radius;
          }

          if (type === 'color') {
            style.backgroundColor = option;
          }

          return (
            <button
              type="button"
              key={option}
              className={[
                'product-option-item',
                `product-option-item--${shape}`,
                `product-option-item--${type}`,
                isSelected ? 'is-selected' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={style}
              onClick={() => handleSelect(option)}
              aria-label={type === 'color' ? `Cor ${option}` : option}
              aria-pressed={isSelected}
            >
              {type === 'text' ? option : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProductOptions;
