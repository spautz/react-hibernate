import React, { useRef, ReactNode } from 'react';
import { ReactComponentLike } from 'prop-types';
import { useLimitedCache } from 'limited-cache/hooks';
import { createPortalNode, InPortal, PortalNode } from 'react-reverse-portal';

import {
  HibernationAccessorContext,
  SubtreeIsActiveContext,
  HibernationAccessorFns,
} from './contexts';
import { HibernatingSubtreeId } from './types';

export type SubtreeEntry = [PortalNode, ReactNode];

export interface HibernationProviderProps {
  children: ReactNode;
  maxCacheSize?: number;
  maxCacheTime?: number;
  WrapperComponent?: ReactComponentLike | null;
}

const renderInPortalsForSubtreeEntries = (
  entryCache: Record<HibernatingSubtreeId, SubtreeEntry | null>,
  isActive: boolean,
): ReactNode => {
  console.log('renderInPortalsForSubtreeEntries()', entryCache, isActive);
  return (
    <React.Fragment>
      {Object.keys(entryCache).map((subtreeId) => {
        const subtreeEntry = entryCache[subtreeId] as SubtreeEntry;
        if (subtreeEntry) {
          const [portalNode, subtreeChildren] = subtreeEntry;
          return (
            <InPortal key={subtreeId + '-' + isActive} node={portalNode}>
              <SubtreeIsActiveContext.Provider value={isActive}>
                {subtreeChildren}
              </SubtreeIsActiveContext.Provider>
            </InPortal>
          );
        }
        return null;
      })}
    </React.Fragment>
  );
};

const HibernationProvider: React.FC<HibernationProviderProps> = ({
  children,
  maxCacheSize,
  maxCacheTime,
  WrapperComponent,
  ...unrecognizedProps
}: HibernationProviderProps) => {
  if (process.env.NODE_ENV !== 'production') {
    const numUnrecognizedProps = Object.keys(unrecognizedProps).length;
    if (numUnrecognizedProps) {
      console.warn(
        `Unrecognized prop{numUnrecognizedProps===1?'':'s'} given to HibernationProvider: `,
        unrecognizedProps,
      );
    }

    const InitialWrapperComponentRef = useRef(WrapperComponent);
    if (WrapperComponent !== InitialWrapperComponentRef.current) {
      console.warn(
        'The WrapperComponent component given to HibernationProvider changed between renders: this will cause a remount.',
      );
      InitialWrapperComponentRef.current = WrapperComponent;
    }
  }

  const activeSubtreeCache: Record<HibernatingSubtreeId, SubtreeEntry | null> = useRef(
    Object.create(null),
  ).current;
  const hibernatedSubtreeCache = useLimitedCache({
    maxCacheSize,
    maxCacheTime,
  });

  const [, setState] = React.useState(0);
  const rerenderScheduledRef = useRef(false);
  const rerender = () => {
    if (!rerenderScheduledRef.current) {
      rerenderScheduledRef.current = true;
      setTimeout(() => {
        console.log('rerender()');
        setState((a) => a + 1);
      });
    }
  };

  // Functions for HibernationAccessorContext:

  const getSubtreeEntry = (subtreeId: HibernatingSubtreeId): SubtreeEntry =>
    activeSubtreeCache[subtreeId] || hibernatedSubtreeCache.get(subtreeId);

  const isSubtreeActive = (subtreeId: HibernatingSubtreeId): boolean =>
    Object.prototype.hasOwnProperty.call(activeSubtreeCache, subtreeId) &&
    !!activeSubtreeCache[subtreeId];

  const markSubtreeActive = (subtreeId: HibernatingSubtreeId, children: ReactNode): void => {
    console.log('markSubtreeActive! ', subtreeId, children);

    const existingEntry = getSubtreeEntry(subtreeId);

    if (isSubtreeActive(subtreeId)) {
      console.log('...markActive: already active ', existingEntry);
      // It's already active: just update children
      existingEntry[1] = children;
    } else {
      // It's new!
      const newEntry: SubtreeEntry = [createPortalNode(), children];
      console.log('...markActive: new ', newEntry);
      activeSubtreeCache[subtreeId] = newEntry;
      hibernatedSubtreeCache.remove(subtreeId);

      rerender();
    }

    console.log('activeSubtreeCache = ', activeSubtreeCache);
    console.log('hibernatedSubtreeCache = ', hibernatedSubtreeCache.get());
  };

  const markSubtreeInactive = (subtreeId: HibernatingSubtreeId): void => {
    console.log('markInactive! ', subtreeId);

    const existingEntry = activeSubtreeCache[subtreeId];

    console.log('...markInactive: ', existingEntry);

    activeSubtreeCache[subtreeId] = null;
    hibernatedSubtreeCache.set(subtreeId, existingEntry);

    rerender();

    console.log('activeSubtreeCache = ', activeSubtreeCache);
    console.log('hibernatedSubtreeCache = ', hibernatedSubtreeCache.get());
  };

  const subtreeAccessorFns = useRef([
    getSubtreeEntry,
    isSubtreeActive,
    markSubtreeActive,
    markSubtreeInactive,
  ] as HibernationAccessorFns).current;

  console.log('=== rendering ===', activeSubtreeCache, hibernatedSubtreeCache.get());

  return (
    <HibernationAccessorContext.Provider value={subtreeAccessorFns}>
      <React.Fragment>{children}</React.Fragment>
      {renderInPortalsForSubtreeEntries(hibernatedSubtreeCache.get(), false)}
      {renderInPortalsForSubtreeEntries(activeSubtreeCache, true)}
    </HibernationAccessorContext.Provider>
  );
};
HibernationProvider.defaultProps = {
  maxCacheSize: 5,
  maxCacheTime: 5 * 60 * 1000,
  WrapperComponent: null,
};

export default HibernationProvider;
