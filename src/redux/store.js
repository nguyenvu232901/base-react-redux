// store.js
import { createStore, combineReducers } from "redux";
import userReducer from "./userSlice";

// Kết hợp reducer (có thể mở rộng sau này)
const rootReducer = combineReducers({
  user: userReducer,
});

// Tạo store
const store = createStore(rootReducer);

export default store;
