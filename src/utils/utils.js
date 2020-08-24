import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';

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

const formatTime = time => {
  if (!time || time.toLowerCase().includes('m')) return time;
  const [hour, minute] = time.split(':');
  if (!hour || !minute) return time;

  const date = new Date();
  //date.setHours(Number(hour));
  //date.setMinutes(Number(minute));
  return format(date, 'h:mm a');
};

export { usePrevious, formatCurrency, convertBreaks, formatTime };
