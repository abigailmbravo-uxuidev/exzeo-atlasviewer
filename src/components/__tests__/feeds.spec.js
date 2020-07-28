import React from 'react';
import { render } from '@testing-library/react';
import Feeds from '../feeds';

describe('App', () => {
  const filter = '';
  const setIsMapLoading = () => {};

  test('renders Feeds component', () => {
    render(<Feeds filter={filter} setIsMapLoading={setIsMapLoading} />);
  });
});
