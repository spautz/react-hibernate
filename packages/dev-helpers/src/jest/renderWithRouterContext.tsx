import React, { ReactElement, ComponentType } from 'react';
import { isElement } from 'react-is';
import { MemoryRouter, MemoryRouterProps } from 'react-router';
import { render } from '@testing-library/react';

const renderWithRouterContext = (
  AppRoot: ReactElement | ComponentType,
  routerProps: MemoryRouterProps = {},
): ReturnType<typeof render> => {
  const renderResult = render(
    <MemoryRouter {...routerProps}>{isElement(AppRoot) ? AppRoot : <AppRoot />}</MemoryRouter>,
  );
  return {
    ...renderResult,
    history,
  };
};

export default renderWithRouterContext;
