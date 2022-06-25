import {createAction, createSlice, SliceCaseReducers} from "@reduxjs/toolkit";
import type {IPost} from "../../api/types";

export type IState = IPost[];

const initialState: IState = [];

export const postSlice = createSlice<IState, SliceCaseReducers<IState>>({
  name: "posts",
  initialState,
  reducers: {
    set: (_, action) => action.payload,
  },
});

export const {actions} = postSlice;
export default postSlice.reducer;
