import { DECREMENT } from '../action/counterAction';
import { LOGIN_SUCCESS, LOGOUT } from '../action/userAction';
const INITIAL_STATE = {
  account: {
    access_token: '',
    refresh_token: '',
    username: '',
    image: '',
    role: '',
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // console.log('Login success action: ', action);
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
        },
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default userReducer;
