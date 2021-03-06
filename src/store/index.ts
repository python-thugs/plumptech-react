import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux";
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// @ts-ignore
import logger from "redux-logger";
import authReducer from "./auth";
import postsReducer from "./posts";

function getAppKey() {
  if (!process.env.REACT_APP_APP_KEY) {
    throw "# Set REACT_APP_APP_KEY variable!"; // eslint-disable-line
  }
  return process.env.REACT_APP_APP_KEY;
}

const persistConfig: PersistConfig<any> = {
  key: getAppKey(),
  storage,
  debug: process.env.NODE_ENV === "development",
};

const combinedReducers = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export const store = configureStore({
  reducer: persistReducer<ReturnType<typeof combinedReducers>>(
    persistConfig,
    combinedReducers
  ),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV === "development",
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
