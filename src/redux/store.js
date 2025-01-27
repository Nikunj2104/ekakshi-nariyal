import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

// Authentication reducer
const authReducer = (state = { isLoggedIn: false, userName: "" }, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true, userName: action.payload.userName };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, userName: "" };
    default:
      return state;
  }
};

// Combine reducers (if you have more reducers)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create store
const store = createStore(rootReducer);

export { store };
