// store/reducer/user.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchTest } from "./thunk";
interface userType {
    email: string;
    password: string;
    userInfo: object | null;
}
const initialState: userType = {
    email: "",
    password: "",
    userInfo: {},
};
export const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        user_setEmail: (state, action) => {
            state.email = action.payload;
        },
        user_setPassword: (state, action) => {
            state.password = action.payload;
        },
        user_setUserInfo: (state, action) => {
            state.userInfo[action.key] = action.val;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchTest.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.userInfo = {
                    ...action.payload,
                };
            },
        );
    },
});
export const user = slice.name;
export const userReducer = slice.reducer;
export const userAction = slice.actions;
