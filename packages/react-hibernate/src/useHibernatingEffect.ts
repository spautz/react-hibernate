import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import { useIsActiveContext } from './contexts';

const useHibernatingEffect = (
  callbackFn: (isActive: boolean) => ReturnType<EffectCallback>,
  deps?: DependencyList,
): void => {
  const isActive = useIsActiveContext();
  const cleanupFnRef = useRef<ReturnType<EffectCallback>>();

  useEffect(
    () => {
      cleanupFnRef.current = callbackFn(isActive);
      return cleanupFnRef.current;
    },
    deps ? [...deps, isActive] : [isActive],
  );
};

export default useHibernatingEffect;
