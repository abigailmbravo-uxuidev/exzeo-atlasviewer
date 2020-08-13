import React from 'react';
import { render } from '@testing-library/react';
import { UserProvider } from '../../context/user-context';
import { FeedProvider } from '../../context/feed-context';
import { LayerProvider } from '../../context/layer-context';

export const ProviderWrapper = ({ children }) => {
  return (
    <UserProvider>
      <FeedProvider>
        <LayerProvider>{children}</LayerProvider>
      </FeedProvider>
    </UserProvider>
  );
};
