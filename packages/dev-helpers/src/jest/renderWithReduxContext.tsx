import React, { ReactElement, ComponentType } from 'react';
import { isElement } from 'react-is';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

const renderWithReduxContext = (
  AppRoot: ReactElement | ComponentType,
  store: Store,
): ReturnType<typeof render> => {
  return render(<Provider store={store}>{isElement(AppRoot) ? AppRoot : <AppRoot />}</Provider>);
};

export default renderWithReduxContext;
