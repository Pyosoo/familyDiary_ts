// store/reducer/user/user.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTest } from "./thunk";

export interface userType {
  email: string;
  password: string;
  userInfo: {
    [key: string]: any;
  };
}

const initialState: userType = {
  email: "",
  password: "",
  userInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    user_setEmail: (state, action) => {
      state.email = action.payload;
    },
    user_setPassword: (state, action) => {
      state.password = action.payload;
    },
    user_setUserInfo: (state, action: PayloadAction<{ key: string; val: any }>) => {
      state.userInfo[action.payload.key] = action.payload.val;
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

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
export default userSlice; // 리듀서 모듈을 내보냅니다.