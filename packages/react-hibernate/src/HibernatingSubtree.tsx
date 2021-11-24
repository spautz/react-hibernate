import React, { ReactNode } from 'react';
import { OutPortal } from 'react-reverse-portal';

import { useHibernationAccessorContext } from './contexts';
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

  const [getSubtreeEntry, , markSubtreeActive, markSubtreeInactive] =
    useHibernationAccessorContext();

  // Activation is synchronous (with a scheduled rerender); deactivation is async
  markSubtreeActive(subtreeId, children);
  React.useEffect(() => {
    return (): void => markSubtreeInactive(subtreeId);
  }, [markSubtreeInactive, subtreeId]);

  const myEntry = getSubtreeEntry(subtreeId);

  console.log('=== rendering HibernatingSubtree (maybe) ===', myEntry);

  return <OutPortal node={myEntry[0]} />;
};
HibernatingSubtree.defaultProps = {};

export { HibernatingSubtree };
