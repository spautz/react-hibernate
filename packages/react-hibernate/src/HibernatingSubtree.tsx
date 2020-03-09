import React, { ReactNode } from 'react';
import { OutPortal } from 'react-reverse-portal';

import { useHibernationAccessorContext } from './contexts';
import { SubtreeEntry } from './HibernationProvider';
import { HibernatingSubtreeId } from './types';

interface HibernatingSubtreeProps {
  children: ReactNode;
  subtreeId: HibernatingSubtreeId;
}

const HibernatingSubtree: React.FC<HibernatingSubtreeProps> = ({
  children,
  subtreeId,
  ...unrecognizedProps
}: HibernatingSubtreeProps) => {
  if (process.env.NODE_ENV !== 'production') {
    const numUnrecognizedProps = Object.keys(unrecognizedProps).length;
    if (numUnrecognizedProps) {
      console.warn(
        `Unrecognized prop{numUnrecognizedProps===1?'':'s'} given to HibernationProvider: `,
        unrecognizedProps,
      );
    }
  }

  if (!subtreeId) {
    throw new Error('HibernatingSubtree must be given a subtreeId.');
  }

  const accessors = useHibernationAccessorContext();
  if (!accessors) {
    throw new Error('<HibernatingSubtree> must be used within a <HibernationProvider>.');
  }
  const [getEntry, getIsActive, markActive, markInactive] = accessors;

  markActive(subtreeId, children);
  const myEntry: SubtreeEntry = getEntry(subtreeId);
  const isActive = getIsActive(subtreeId);

  console.log('<HibernatingSubtree>', subtreeId, myEntry, isActive);

  React.useEffect(() => {
    return (): void => markInactive(subtreeId);
  }, [markInactive, subtreeId]);

  return <OutPortal node={myEntry[0]} />;
};
HibernatingSubtree.defaultProps = {};

export default HibernatingSubtree;
