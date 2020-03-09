import { createContext, ReactNode, useContext } from 'react';
import { HibernatingSubtreeId } from './types';
import { SubtreeEntry } from './HibernationProvider';

export type HibernationAccessorFns = [
  (subtreeId: HibernatingSubtreeId) => SubtreeEntry,
  (subtreeId: HibernatingSubtreeId) => boolean,
  (subtreeId: HibernatingSubtreeId, children: ReactNode) => void,
  (subtreeId: HibernatingSubtreeId) => void,
];

const HibernationAccessorContext = createContext<HibernationAccessorFns | null>(null);
const SubtreeIsActiveContext = createContext<boolean>(true);

const useHibernationAccessorContext = (): HibernationAccessorFns | null =>
  useContext(HibernationAccessorContext);
const useIsActiveContext = (): boolean => useContext(SubtreeIsActiveContext);

export {
  HibernationAccessorContext,
  SubtreeIsActiveContext,
  useHibernationAccessorContext,
  useIsActiveContext,
};
