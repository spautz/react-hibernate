import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const INCREMENT_ACTION = 'INCREMENT_!' as const;
const DECREMENT_ACTION = 'DECREMENT_!' as const;
const SET_ACTION = 'SET_!' as const;

export type DevHelperState = {
  count: number;
};

type DevHelperAction_Increment = {
  type: typeof INCREMENT_ACTION;
};
type DevHelperAction_Decrement = {
  type: typeof DECREMENT_ACTION;
};
type DevHelperAction_Set = {
  type: typeof SET_ACTION;
  payload: {
    newValue: number;
  };
};

export type DevHelperAction =
  | DevHelperAction_Increment
  | DevHelperAction_Decrement
  | DevHelperAction_Set;

const initialState: DevHelperState = {
  count: 0,
};

const incrementAction = (): DevHelperAction_Increment => ({ type: INCREMENT_ACTION });
const decrementAction = (): DevHelperAction_Decrement => ({ type: DECREMENT_ACTION });
const setAction = (newValue: number): DevHelperAction_Set => ({
  type: SET_ACTION,
  payload: { newValue },
});

const reducer = (state: DevHelperState = initialState, action: DevHelperAction): DevHelperState => {
  const { type } = action;
  switch (type) {
    case INCREMENT_ACTION: {
      return {
        ...state,
        count: state.count + 1,
      };
    }

    case DECREMENT_ACTION: {
      return {
        ...state,
        count: state.count - 1,
      };
    }

    case SET_ACTION: {
      const {
        payload: { newValue },
      } = action as DevHelperAction_Set;
      return {
        ...state,
        count: newValue,
      };
    }

    default:
      break;
  }

  return state;
};

const createDevHelperStore = (): Store => createStore(reducer, initialState, composeWithDevTools());

export { createDevHelperStore, incrementAction, decrementAction, setAction };
