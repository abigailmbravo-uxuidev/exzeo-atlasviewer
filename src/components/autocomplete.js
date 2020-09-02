import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const comboboxStyles = { display: 'inline-block', marginLeft: '5px' };

let Item = ({ isHighlighted, getItemProps, item, index }) => {
  return (
    <li
      className="auto-complete-list-item"
      style={isHighlighted ? { backgroundColor: '#bde4ff' } : {}}
      key={`${item}${index}`}
      {...getItemProps({ item, index })}
    >
      {item}
    </li>
  );
};

Item = memo(Item);

const Autocomplete = ({ items, onChange, isSubmitting }) => {
  const [inputItems, setInputItems] = useState(items);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    inputValue,
    reset
  } = useCombobox({
    items: inputItems,
    onSelectedItemChange: ({ inputValue }) => onChange(inputValue),
    onInputValueChange: ({ inputValue }) => {
      if (isSubmitting) {
        return onChange(inputValue);
      }
      setInputItems(
        items.filter(item =>
          item.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  });

  useEffect(() => {
    //if (inputValue.length > 0 && isSubmitting) reset();
  }, [inputValue, isSubmitting, reset]);

  return (
    <div className="input-field">
      <div style={comboboxStyles} {...getComboboxProps()}>
        <input name="autocomplete" {...getInputProps()} />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
      <ul {...getMenuProps()} className="auto-complete-list">
        {isOpen &&
          inputItems.map((item, index) => (
            <Item
              key={item}
              isHighlighted={highlightedIndex === index}
              getItemProps={getItemProps}
              item={item}
              index={index}
            />
          ))}
      </ul>
    </div>
  );
};

Autocomplete.propTypes = {
  list: PropTypes.array
};

export default Autocomplete;
