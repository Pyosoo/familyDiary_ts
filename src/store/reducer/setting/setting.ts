// store/reducer/user.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface settingType {
    // 로그인 여부
    isLoginSuccess: boolean;
    loginId: string;

    // snackbar 관련
    snackbar: {
        snackbarOpen: boolean;
        snackbarType: string;
        snackbarMessage: string;
    };
}
const initialState: settingType = {
    isLoginSuccess: false,
    loginId: "",
    snackbar: {
        snackbarOpen: false,
        snackbarType: 'error',
        snackbarMessage: ''
    }
    
};
export const slice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        setIsLoginSuccess: (state, action: PayloadAction<boolean>) => {
            state.isLoginSuccess = action.payload;
        },
        setLoginId:  (state, action: PayloadAction<string>) => {
            state.loginId = action.payload;
        },
        setSnackbar: (state, action: PayloadAction<{ snackbarOpen: boolean, snackbarType: string, snackbarMessage: string }>) => {
            state.snackbar = action.payload;
        },
    },
    extraReducers: (builder) => {},
});
export const setting = slice.name;
export const settingReducer = slice.reducer;
export const settingAction = slice.actions;
export type RootSettingState = ReturnType<typeof settingReducer>;
