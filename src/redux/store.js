import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default is localStorage

// Manually create a noop storage for SSR
const noopStorage = {
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
};

// Authentication reducer
const authReducer = (
  state = { isLoggedIn: false, userName: "", searchQuery: "" },
  action
) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true, userName: action.payload.userName };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, userName: "" };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

// Cart reducer
const cartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "UPDATE_CART_ITEM_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.amount }
            : item
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

// Wishlist reducer
const wishlistReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "CLEAR_WISHLIST":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage: typeof window !== "undefined" ? storage : noopStorage, // Use noopStorage on the server side
  whitelist: ["auth", "cart", "wishlist"], // Persist auth, cart, and wishlist states
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production", // Enable DevTools in development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create a persistor to manage persistence
const persistor = persistStore(store);

export { store, persistor };
