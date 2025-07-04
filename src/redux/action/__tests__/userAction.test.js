import { doLogin, doLogout, LOGIN_SUCCESS, LOGOUT } from '../userAction';

describe('User Actions', () => {
  describe('doLogin', () => {
    it('should create an action to login with user data', () => {
      const userData = {
        DT: {
          access_token: 'test-token',
          refresh_token: 'test-refresh-token',
          username: 'testuser',
          image: 'test-image.jpg',
          role: 'USER',
        },
      };

      const expectedAction = {
        type: LOGIN_SUCCESS,
        payload: userData,
      };

      expect(doLogin(userData)).toEqual(expectedAction);
    });

    it('should handle empty user data', () => {
      const expectedAction = {
        type: LOGIN_SUCCESS,
        payload: null,
      };

      expect(doLogin(null)).toEqual(expectedAction);
    });
  });

  describe('doLogout', () => {
    it('should create an action to logout', () => {
      const expectedAction = {
        type: LOGOUT,
      };

      expect(doLogout()).toEqual(expectedAction);
    });
  });

  describe('Action Types', () => {
    it('should have correct action type constants', () => {
      expect(LOGIN_SUCCESS).toBe('LOGIN_SUCCESS');
      expect(LOGOUT).toBe('LOGOUT');
    });
  });
});
