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

  // 메인 켈린더 날짜 관련
  selectDate: Date;
  diaryModalOpen: boolean;
  diaryModalData: object;
}

const initialState: settingType = {
  isLoginSuccess: false,
  loginId: "",
  snackbar: {
    snackbarOpen: false,
    snackbarType: 'error',
    snackbarMessage: ''
  },

  selectDate: new Date(),
  diaryModalOpen: false,
  diaryModalData: {
    id: '',
    title: '',
    content: ''
  }
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSelectDate: (state, action: PayloadAction<Date>) => {
      state.selectDate = action.payload
    },
    setIsLoginSuccess: (state, action: PayloadAction<boolean>) => {
      state.isLoginSuccess = action.payload;
    },
    setLoginId: (state, action: PayloadAction<string>) => {
      state.loginId = action.payload;
    },
    setSnackbar: (state, action: PayloadAction<{ snackbarOpen: boolean; snackbarType: string; snackbarMessage: string }>) => {
      state.snackbar = action.payload;
    },
    setDiaryModalOpen: (state, action: PayloadAction<boolean>) => {
      state.diaryModalOpen = action.payload
    },
    setDiaryModalData: (state, action: PayloadAction<object>) => {
      state.diaryModalData = action.payload
    }
  },
  extraReducers: (builder) => {},
});

export const settingReducer = settingSlice.reducer;
export const settingAction = settingSlice.actions;
export default settingSlice; // 리듀서 모듈을 내보냅니다.