import { useSelector } from 'react-redux';

import { DevHelperState } from './store';

const countSelector = (state: DevHelperState) => state.count;

const useCountSelector = (): number => {
  return useSelector(countSelector);
};

export default useCountSelector;
