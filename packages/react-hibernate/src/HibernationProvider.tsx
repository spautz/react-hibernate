import React, { ReactNode, useMemo, useRef } from 'react';
import { LimitedCache } from 'limited-cache';
import { ReactComponentLike } from 'prop-types';
import { InPortal, createHtmlPortalNode } from 'react-reverse-portal';

import {
  HibernationAccessorContext,
  HibernationAccessorFns,
  SubtreeIsActiveContext,
} from './contexts';
import { HibernatingSubtreeId, HibernatingSubtreeEntry } from './types';

export interface HibernationProviderProps {
  children: ReactNode;
  maxCacheSize?: number;
  maxCacheTime?: number;
  WrapperComponent?: ReactComponentLike | null;
}

const renderInPortalsForSubtreeEntries = (
  entryCache: Record<HibernatingSubtreeId, HibernatingSubtreeEntry | null>,
  isActive: boolean,
): Array<ReactNode> => {
  return Object.keys(entryCache).map((subtreeId) => {
    const subtreeEntry = entryCache[subtreeId];
    if (subtreeEntry) {
      const [portalNode, subtreeChildren] = subtreeEntry;
      return (
        <InPortal key={subtreeId} node={portalNode}>
          <SubtreeIsActiveContext.Provider value={isActive}>
            {subtreeChildren}
          </SubtreeIsActiveContext.Provider>
        </InPortal>
      );
    }
    return null;
  });
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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const InitialWrapperComponentRef = useRef(WrapperComponent);
    if (WrapperComponent !== InitialWrapperComponentRef.current) {
      console.warn(
        'The WrapperComponent component given to HibernationProvider changed between renders: this will cause a remount.',
      );
      InitialWrapperComponentRef.current = WrapperComponent;
    }
  }

  const activeSubtreeCache = useRef<Record<HibernatingSubtreeId, HibernatingSubtreeEntry | null>>(
    Object.create(null),
  ).current;
  const hibernatedSubtreeCache = useMemo(LimitedCache, []);
  useMemo(
    () =>
      hibernatedSubtreeCache.setOptions({
        maxCacheSize,
        maxCacheTime,
      }),
    [hibernatedSubtreeCache, maxCacheSize, maxCacheTime],
  );

  const [, setState] = React.useState(0);
  // const rerenderScheduledRef = useRef(false);
  const rerender = (): void => {
    // if (!rerenderScheduledRef.current) {
    // rerenderScheduledRef.current = true;
    // setTimeout(() => {
    console.log('rerender()');
    setState((a) => a + 1);
    // });
    // }
  };

  // Functions for HibernationAccessorContext:

  const getSubtreeEntry = (subtreeId: HibernatingSubtreeId): HibernatingSubtreeEntry =>
    activeSubtreeCache[subtreeId] || hibernatedSubtreeCache.get(subtreeId);

  const isSubtreeActive = (subtreeId: HibernatingSubtreeId): boolean =>
    Object.prototype.hasOwnProperty.call(activeSubtreeCache, subtreeId) &&
    !!activeSubtreeCache[subtreeId];

  const markSubtreeActive = (subtreeId: HibernatingSubtreeId, children: ReactNode): void => {
    console.log('markSubtreeActive! ', subtreeId, children);

    const existingEntry = getSubtreeEntry(subtreeId);

    if (isSubtreeActive(subtreeId)) {
      console.log('...markActive: already active ', subtreeId, ...existingEntry);
      // It's already active: just update children
      existingEntry[1] = children;
      activeSubtreeCache[subtreeId] = existingEntry;
    } else if (existingEntry) {
      console.log('...markActive: restored ', subtreeId, ...existingEntry);
      // Bring it back from hibernation
      existingEntry[1] = children;
      activeSubtreeCache[subtreeId] = existingEntry;
      hibernatedSubtreeCache.remove(subtreeId);
    } else {
      // It's new!
      const newEntry: HibernatingSubtreeEntry = [createHtmlPortalNode(), children];
      console.log('...markActive: new ', subtreeId, ...newEntry);
      activeSubtreeCache[subtreeId] = newEntry;
      hibernatedSubtreeCache.remove(subtreeId);
    }

    setTimeout(rerender);

    // console.log('activeSubtreeCache = ', activeSubtreeCache);
    // console.log('hibernatedSubtreeCache = ', hibernatedSubtreeCache.getAll());
  };

  const markSubtreeInactive = (subtreeId: HibernatingSubtreeId): void => {
    console.log('markSubtreeInactive! ', subtreeId);

    const existingEntry = activeSubtreeCache[subtreeId];

    if (existingEntry) {
      console.log('...markInactive: ', subtreeId, ...existingEntry);

      activeSubtreeCache[subtreeId] = null;
      hibernatedSubtreeCache.set(subtreeId, existingEntry);

      rerender();

      console.log('activeSubtreeCache = ', activeSubtreeCache);
      console.log('hibernatedSubtreeCache = ', hibernatedSubtreeCache.getAll());
    } else {
      console.warn('Tried to mark a subtree inactive when it was not active!', subtreeId);
    }
  };

  const subtreeAccessorFns = useRef<HibernationAccessorFns>([
    getSubtreeEntry,
    isSubtreeActive,
    markSubtreeActive,
    markSubtreeInactive,
  ]).current;

  console.log(
    '=== rendering HibernationAccessorContext.Provider ===',
    activeSubtreeCache,
    hibernatedSubtreeCache.getAll(),
  );

  return (
    <HibernationAccessorContext.Provider value={subtreeAccessorFns}>
      <React.Fragment>{children}</React.Fragment>
      <React.Fragment>
        {[
          ...renderInPortalsForSubtreeEntries(hibernatedSubtreeCache.getAll(), false),
          ...renderInPortalsForSubtreeEntries(activeSubtreeCache, true),
        ]}
      </React.Fragment>
    </HibernationAccessorContext.Provider>
  );
};
HibernationProvider.defaultProps = {
  maxCacheSize: 5,
  maxCacheTime: 5 * 60 * 1000,
  WrapperComponent: null,
};

export { HibernationProvider };
