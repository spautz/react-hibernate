import { createContext, ReactNode, useContext } from 'react';
import { HibernatingSubtreeId, HibernatingSubtreeEntry } from './types';

type getHibernatingSubtreeEntry = (subtreeId: HibernatingSubtreeId) => HibernatingSubtreeEntry;
type getHibernatingSubtreeIsActive = (subtreeId: HibernatingSubtreeId) => boolean;
type markHibernatingSubtreeActive = (subtreeId: HibernatingSubtreeId, children: ReactNode) => void;
type markHibernatingSubtreeInactive = (subtreeId: HibernatingSubtreeId) => void;

export type HibernationAccessorFns = [
  getHibernatingSubtreeEntry,
  getHibernatingSubtreeIsActive,
  markHibernatingSubtreeActive,
  markHibernatingSubtreeInactive,
];

const HibernationAccessorContext = createContext<HibernationAccessorFns | null>(null);
const SubtreeIsActiveContext = createContext<boolean>(true);

const useHibernationAccessorContext = (): HibernationAccessorFns => {
  const accessors = useContext(HibernationAccessorContext);
  if (!accessors) {
    throw new Error('<HibernatingSubtree> must be used within a <HibernationProvider>.');
  }
  return accessors;
};

const useIsActiveContext = (): boolean => useContext(SubtreeIsActiveContext);

export {
  HibernationAccessorContext,
  SubtreeIsActiveContext,
  useHibernationAccessorContext,
  useIsActiveContext,
};
