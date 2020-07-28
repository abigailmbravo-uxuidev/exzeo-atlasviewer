import React, { forwardRef, useRef, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const Checkbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;
  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

Checkbox.propTypes = {};

export default Checkbox;
