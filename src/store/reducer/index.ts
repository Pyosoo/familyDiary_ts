import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user"; // 여기에 사용하는 리듀서를 모두 가져와야 합니다.
import { settingReducer } from "./setting/setting";

// 모든 리듀서를 합칩니다.
const RootReducer = combineReducers({
  user: userReducer,
  setting: settingReducer,
});

export default RootReducer;
export type RootState = ReturnType<typeof RootReducer>;