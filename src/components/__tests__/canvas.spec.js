import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from './utilities';
import Feeds from '../feeds';

jest.mock('mapbox-gl');

const useAuth = jest.fn();

describe('App', () => {
  test('renders canvas component', () => {
    render(<Feeds />);
    expect(screen.getByText('Data Feed'));
  });
});
