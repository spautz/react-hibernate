/* global console */

// Something about the portal usage, combined with react being a direct devDependency, leads to these errors
// appearing *between* tests. They don't occur when the library runs normally.
let originalConsoleError: null | typeof console.error;

const suppressReactUnmountErrors = (): void => {
  const errorMessagesToSuppress = [
    "Warning: unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.",
    'Warning: render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.',
  ];

  if (originalConsoleError) {
    throw new Error('console.error cannot be replaced: it has already been replaced');
  }

  originalConsoleError = console.error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (message?: any, ...optionalParams: any[]): void => {
    if (errorMessagesToSuppress.includes(message)) {
      return;
    }
    // Else: pass it through
    if (originalConsoleError) {
      originalConsoleError(message, ...optionalParams);
    } else {
      throw new Error('console.error is replaced, but originalConsoleError is not available');
    }
  };
};

const restoreReactUnmountErrors = (): void => {
  if (originalConsoleError) {
    console.error = originalConsoleError;
    originalConsoleError = null;
  }
};

export { suppressReactUnmountErrors, restoreReactUnmountErrors };
