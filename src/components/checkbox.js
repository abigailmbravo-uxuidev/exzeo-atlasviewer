import React, { forwardRef, useRef, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const Checkbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;
  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <div>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </div>
  );
});

Checkbox.propTypes = {};

export default Checkbox;
