import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const menuStyles = {
  maxHeight: '180px',
  overflowY: 'auto',
  width: '135px',
  margin: 0,
  borderTop: 0,
  background: 'white',
  position: 'absolute',
  zIndex: 1000,
  listStyle: 'none',
  padding: 0,
  left: '135px'
};

const comboboxStyles = { display: 'inline-block', marginLeft: '5px' };

let Item = ({ isHighlighted, getItemProps, item, index }) => {
  return (
    <li
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
      setInputItems(
        items.filter(item =>
          item.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  });

  useEffect(() => {
    if (inputValue.length > 0 && isSubmitting) reset();
  }, [inputValue, isSubmitting, reset]);

  return (
    <div className="input-field">
      <div style={comboboxStyles} {...getComboboxProps()}>
        <input name="autocomplete" {...getInputProps()} />
        <button {...getToggleButtonProps()} aria-label="toggle menu">
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
      <ul {...getMenuProps()} style={menuStyles}>
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
