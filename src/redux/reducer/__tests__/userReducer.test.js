import userReducer from '../userReducer';
import { LOGIN_SUCCESS, LOGOUT } from '../../action/userAction';
import { DECREMENT } from '../../action/counterAction';

describe('userReducer', () => {
  const initialState = {
    account: {
      access_token: '',
      refresh_token: '',
      username: '',
      image: '',
      role: '',
    },
    isAuthenticated: false,
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const loginAction = {
      type: LOGIN_SUCCESS,
      payload: {
        DT: {
          access_token: 'test-token',
          refresh_token: 'test-refresh-token',
          username: 'testuser',
          image: 'test-image.jpg',
          role: 'USER',
        },
      },
    };

    const expectedState = {
      account: {
        access_token: 'test-token',
        refresh_token: 'test-refresh-token',
        username: 'testuser',
        image: 'test-image.jpg',
        role: 'USER',
      },
      isAuthenticated: true,
    };

    expect(userReducer(initialState, loginAction)).toEqual(expectedState);
  });

  it('should handle LOGOUT', () => {
    const authenticatedState = {
      account: {
        access_token: 'test-token',
        refresh_token: 'test-refresh-token',
        username: 'testuser',
        image: 'test-image.jpg',
        role: 'USER',
      },
      isAuthenticated: true,
    };

    const logoutAction = {
      type: LOGOUT,
    };

    const expectedState = {
      account: {
        access_token: 'test-token',
        refresh_token: 'test-refresh-token',
        username: 'testuser',
        image: 'test-image.jpg',
        role: 'USER',
      },
      isAuthenticated: false,
    };

    expect(userReducer(authenticatedState, logoutAction)).toEqual(expectedState);
  });

  it('should handle DECREMENT', () => {
    const stateWithCount = {
      ...initialState,
      count: 5,
    };

    const decrementAction = {
      type: DECREMENT,
    };

    const expectedState = {
      ...initialState,
      count: 4,
    };

    expect(userReducer(stateWithCount, decrementAction)).toEqual(expectedState);
  });

  it('should handle LOGIN_SUCCESS with missing payload data', () => {
    const loginAction = {
      type: LOGIN_SUCCESS,
      payload: {},
    };

    const expectedState = {
      account: {
        access_token: undefined,
        refresh_token: undefined,
        username: undefined,
        image: undefined,
        role: undefined,
      },
      isAuthenticated: true,
    };

    expect(userReducer(initialState, loginAction)).toEqual(expectedState);
  });
});
