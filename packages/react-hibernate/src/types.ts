import { ReactNode } from 'react';
import { HtmlPortalNode } from 'react-reverse-portal';

export type HibernatingSubtreeId = string;

export type HibernatingSubtreeEntry = [
  /** The portalNode used to keep the subtree alive */
  HtmlPortalNode,
  /** The last thing rendered into the portal */
  ReactNode,
];
