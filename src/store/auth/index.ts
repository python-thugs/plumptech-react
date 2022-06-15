import {createAction, createSlice, SliceCaseReducers} from "@reduxjs/toolkit";
import type {IEmployee} from "../../api/types";

export type IState = Partial<IEmployee>;

const initialState: IState = {};

export const setUserAction = createAction<
  IEmployee & {post_id: number},
  "setUser"
>("setUser");

export const authSlice = createSlice<IState, SliceCaseReducers<IState>>({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setUserAction, (state, {payload}) => {
        state.id = payload.id;
        state.name = payload.name;
        state.post = payload.post_id;
        state.username = payload.username;
      })
      .addDefaultCase(() => {});
  },
});

export const {actions} = authSlice;
export default authSlice.reducer;
