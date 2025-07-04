export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const doLogin = data => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: data,
  };
};

export const doLogout = () => {
  return {
    type: 'LOGOUT',
  };
};
