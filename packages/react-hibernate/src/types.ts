import { ReactNode } from 'react';
import { PortalNode } from 'react-reverse-portal';

export type HibernatingSubtreeId = string;

export type HibernatingSubtreeEntry = [
  /** The portalNode used to keep the subtree alive */
  PortalNode,
  /** The last thing rendered into the portal */
  ReactNode,
];
