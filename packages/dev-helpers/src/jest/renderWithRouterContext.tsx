import React, { ReactElement, ComponentType } from 'react';
import { createMemoryHistory, MemoryHistoryOptions } from 'history';
import { isElement } from 'react-is';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';

const renderWithRouterContext = (
  AppRoot: ReactElement | ComponentType,
  historyOptions?: MemoryHistoryOptions,
): ReturnType<typeof render> => {
  const history = createMemoryHistory(historyOptions);

  const renderResult = render(
    <MemoryRouter>{isElement(AppRoot) ? AppRoot : <AppRoot />}</MemoryRouter>,
  );
  return {
    ...renderResult,
    history,
  };
};

export default renderWithRouterContext;
