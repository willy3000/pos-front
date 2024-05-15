import { configureStore } from "@reduxjs/toolkit";
import { reducer as userReducer } from "../slices/user";
import { reducer as projectsReducer } from "../slices/projects";
import { reducer as cartReducer } from "../slices/cart";
import { reducer as salesReducer } from "../slices/sales";
import { reducer as reportsReducer } from "../slices/reports";
import { reducer as paymentsReducer } from "../slices/payments";
import { reducer as settingsReducer } from "../slices/settings";
import { reducer as customersReducer } from "../slices/customers";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  reducer: {
    user: persistedReducer,
    projects: projectsReducer,
    cart: cartReducer,
    sales: salesReducer,
    reports: reportsReducer,
    payments: paymentsReducer,
    customers: customersReducer,
    settings: settingsReducer
  },
});

export default store;
