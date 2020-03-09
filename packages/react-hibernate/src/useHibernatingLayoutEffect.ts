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
    deps ? [...deps, isActive] : [isActive],
  );
};

export default useHibernatingLayoutEffect;
