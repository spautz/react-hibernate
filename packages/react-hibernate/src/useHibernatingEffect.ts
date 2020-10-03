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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps, isActive] : [isActive],
  );
};

export default useHibernatingEffect;
