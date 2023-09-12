// store/reducer/user/user.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTest } from "./thunk";

export interface userType {
  email: string;
  password: string;
  userInfo: {
    id: string;
    group: boolean;
    groupLeader: string;
  };
}

const initialState: userType = {
  email: "",
  password: "",
  userInfo: {
    id: '',
    group: false,
    groupLeader: ''
  },
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
    setUserInfo: (state, action: PayloadAction<{ id: string, group?: boolean, groupLeader?: string }>) => {
      const newUserInfo = {
        ...state.userInfo,
        ...action.payload
      };
    
      // 변경된 상태를 반환합니다.
      return {
        ...state,
        userInfo: newUserInfo,
      };
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