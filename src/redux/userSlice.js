// Action types
const SET_USER = 'user/SET_USER';
const CLEAR_USER = 'user/CLEAR_USER';

// Action creators
export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

// Initial state
const initialState = {
  user: null,
};

// Reducer
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case CLEAR_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}
