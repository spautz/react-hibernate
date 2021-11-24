import { useIsActiveContext } from './contexts';

const useIsHibernating = (): boolean => {
  return !useIsActiveContext();
};

export { useIsHibernating };
