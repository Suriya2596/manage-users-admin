import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default to localStorage for web
import userAuthSlice from "./feature/userAuth/userAuthSlice";

// Root Reducer combining all the reducers (you can add more slices as needed)
const rootReducer = combineReducers({
  userAuth: userAuthSlice,
  // Add more slices here if needed
});

// Configure persist settings
const persistConfig = {
  key: "newRoot",
  version: 3,
  storage,
  blacklist: [], 
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
