import counterReducer from '../counterReducer';
import { INCREMENT, DECREMENT } from '../../action/counterAction';

describe('counterReducer', () => {
  const initialState = {
    count: 0,
    name: 'Nguyen Vu',
  };

  it('should return the initial state', () => {
    expect(counterReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle INCREMENT', () => {
    const incrementAction = {
      type: INCREMENT,
    };

    const expectedState = {
      count: 1,
      name: 'Nguyen Vu',
    };

    expect(counterReducer(initialState, incrementAction)).toEqual(expectedState);
  });

  it('should handle DECREMENT', () => {
    const stateWithCount = {
      count: 5,
      name: 'Nguyen Vu',
    };

    const decrementAction = {
      type: DECREMENT,
    };

    const expectedState = {
      count: 4,
      name: 'Nguyen Vu',
    };

    expect(counterReducer(stateWithCount, decrementAction)).toEqual(expectedState);
  });

  it('should handle multiple increments', () => {
    let state = initialState;
    const incrementAction = { type: INCREMENT };

    state = counterReducer(state, incrementAction);
    state = counterReducer(state, incrementAction);
    state = counterReducer(state, incrementAction);

    const expectedState = {
      count: 3,
      name: 'Nguyen Vu',
    };

    expect(state).toEqual(expectedState);
  });

  it('should handle unknown action types', () => {
    const unknownAction = {
      type: 'UNKNOWN_ACTION',
    };

    expect(counterReducer(initialState, unknownAction)).toEqual(initialState);
  });
});
