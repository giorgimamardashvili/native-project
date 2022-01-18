import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import cartSlice from "./reducers/cartItems";
import authSlice from "./reducers/auth";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice);
const persistedReducerAuth = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: { cart: persistedReducer, auth: persistedReducerAuth },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
