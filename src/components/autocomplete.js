import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';

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

const Autocomplete = ({ items }) => {
  const [inputItems, setInputItems] = useState(items);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter(item =>
          item.toLowerCase().startsWith(inputValue.toLowerCase()),
        )
      );
    }
  });

  return (
    <div>
      <div style={comboboxStyles} {...getComboboxProps()}>
        <input {...getInputProps()} />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
        >
          &#8595;
        </button>
      </div>
      <ul {...getMenuProps()} style={menuStyles}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

Autocomplete.propTypes = {
  list: PropTypes.array
};

export default Autocomplete;
