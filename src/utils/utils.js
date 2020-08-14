import React, { useEffect, useRef } from 'react';

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

const convertBreaks = (value, replacement = '\u000A') =>
  value && value.replace
    ? value.replace(/[<]br[^>]*[>]/gi, replacement)
    : value;

export { usePrevious, formatCurrency, convertBreaks };
