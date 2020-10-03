import { useSelector } from 'react-redux';

import { DevHelperState } from './store';

const stateSelector = (state: DevHelperState) => state;

const useStateSelector = (): DevHelperState => {
  return useSelector(stateSelector);
};

export default useStateSelector;
