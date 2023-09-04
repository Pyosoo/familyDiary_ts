// store/reducer/user.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface settingType {}
const initialState: settingType = {};
export const slice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});
export const setting = slice.name;
export const settingReducer = slice.reducer;
export const settingAction = slice.actions;
