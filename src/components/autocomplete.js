import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';

const Autocomplete = ({
  value,
  onChange,
  items,
  placeholder = 'Start typing...'
}) => {
  return (
    <Downshift
      initialInputValue={value}
      onChange={onChange}
      itemToString={item => (item ? item : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => (
        <div>
          <input
            {...getInputProps()}
            className="input"
            placeholder={placeholder}
          />
          <ul {...getMenuProps()}>
            {isOpen
              ? items
                  .filter(item => !inputValue || item.includes(inputValue))
                  .map((item, index) => (
                    <li
                      key={item}
                      {...getItemProps({
                        key: item,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : null,
                          fontWeight: selectedItem === item ? 'bold' : 'normal'
                        }
                      })}
                    >
                      {item}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

Autocomplete.propTypes = {
  list: PropTypes.array
};

export default Autocomplete;