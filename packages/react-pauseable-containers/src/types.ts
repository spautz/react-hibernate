import { ReactNode } from 'react';

export interface PauseableContainerProps {
  children: ReactNode;
  shouldUpdate: boolean;
}
