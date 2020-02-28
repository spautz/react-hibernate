import React, { ReactElement, ComponentType } from 'react';
import { createMemoryHistory, MemoryHistoryBuildOptions } from 'history';
import { isElement } from 'react-is';
import { Router } from 'react-router';
import { render } from '@testing-library/react';

const renderWithRouterContext = (
  AppRoot: ReactElement | ComponentType,
  historyOptions?: MemoryHistoryBuildOptions,
): ReturnType<typeof render> => {
  const history = createMemoryHistory(historyOptions);

  const renderResult = render(
    <Router history={history}>{isElement(AppRoot) ? AppRoot : <AppRoot />}</Router>,
  );
  return {
    ...renderResult,
    history,
  };
};

export default renderWithRouterContext;
