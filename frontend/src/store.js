import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducers/authReducers/userReducers.js";
import hotelReducer from "./Reducers/hotelReducers/hotelReducers.js";
import guestReducer from "./Reducers/guestReducers/guestReducers.js";

import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

// Step 1: Configure persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["user"], 
};

// Combine all your reducers
const appReducer = combineReducers({
  user: authReducer,
  hotels: hotelReducer,
  guest: guestReducer,
});

// Root reducer to handle logout and reset state
const rootReducer = (state, action) => {
  if (action.type === 'User/logout' || action.type === 'logoutUser/fulfilled') {
    storage.removeItem('persist:root'); // Clear persisted storage
    state = undefined; // Reset state
  }
  return appReducer(state, action);
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 2: Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore non-serializable warnings from redux-persist
    }),
});

// Step 3: Create the persistor
const persistor = persistStore(store);

export { store, persistor };
