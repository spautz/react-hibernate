import { DependencyList, EffectCallback, useLayoutEffect, useRef } from 'react';
import { useIsActiveContext } from './contexts';

const useHibernatingLayoutEffect = (
  callbackFn: (isActive: boolean) => ReturnType<EffectCallback>,
  deps?: DependencyList,
): void => {
  const isActive = useIsActiveContext();
  const cleanupFnRef = useRef<ReturnType<EffectCallback>>();

  useLayoutEffect(
    () => {
      cleanupFnRef.current = callbackFn(isActive);
      return cleanupFnRef.current;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps, isActive] : [isActive],
  );
};

export { useHibernatingLayoutEffect };
