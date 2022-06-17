import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux";
import {persistStore, persistReducer, PersistConfig} from "redux-persist";
import storage from "redux-persist/lib/storage";
// @ts-ignore
import logger from "redux-logger";
import authReducer from "./auth";

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
export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      auth: authReducer,
    })
  ),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
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
