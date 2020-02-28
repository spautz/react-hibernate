import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// We only need one action: this is all to demonstrate that updates can be frozen
const COUNT_ACTION = 'COUNT_ACTION';

export type HelperState = {
  count: number;
  lastTimestamp: number;
};
export type HelperAction = {
  type: typeof COUNT_ACTION;
};

const initialState: HelperState = {
  count: 0,
  lastTimestamp: 0,
};

const countAction = (): HelperAction => ({ type: COUNT_ACTION });

const reducer = (state: HelperState = initialState, action: HelperAction): HelperState => {
  const { type } = action;
  if (type === COUNT_ACTION) {
    return {
      ...state,
      count: state.count + 1,
      lastTimestamp: Date.now(),
    };
  }
  return state;
};

const store = createStore(reducer, initialState, composeWithDevTools());

export default store;
export { countAction };
