import { useId } from 'react';
import './FilterGroup.css';

function FilterGroup({
  title,
  inputType = 'checkbox',
  options = [],
  name,
  selectedValues,
  onChange,
}) {
  const groupId = useId();
  const fieldName = name || `${title}-${groupId}`;

  return (
    <div className="filter-group">
      <h4 className="filter-group-title">{title}</h4>

      <div className="filter-group-options">
        {options.map((option) => {
          const optionValue = option.value ?? option.text;
          const isControlled = selectedValues !== undefined;
          const isChecked = isControlled
            ? Array.isArray(selectedValues)
              ? selectedValues.includes(optionValue)
              : selectedValues === optionValue
            : undefined;

          return (
            <label key={optionValue} className="filter-option">
              <input
                type={inputType}
                name={fieldName}
                value={optionValue}
                checked={isChecked}
                onChange={() => onChange?.(optionValue)}
              />
              <span>{option.text}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default FilterGroup;
