import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default is localStorage

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

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage, // LocalStorage by default
  whitelist: ["auth"], // Persist only the 'auth' state
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Use Redux Toolkit's configureStore with serializableCheck turned off
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  devTools: process.env.NODE_ENV !== "production", // Enable DevTools in development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions with non-serializable values, like the ones used by redux-persist
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create a persistor to manage persistence
const persistor = persistStore(store);

export { store, persistor };
