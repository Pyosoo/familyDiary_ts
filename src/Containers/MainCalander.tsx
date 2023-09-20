import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import moment from "moment";
import { useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { settingAction } from "@src/store/reducer/setting/setting";
import { loadDiary } from "@src/apis/apis";
import userSlice from "@src/store/reducer/user/user";
import { diaryAction } from "@src/store/reducer/diary/diary";

export default function MainCalander() {
    const selectDate = useSelector(
        (state: RootState) => state.setting.selectDate,
    );
    const userId = useSelector((state: RootState) => state.user.userInfo.id);
    const diaryList = useSelector((state: RootState) => state.diary.diaryList);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const loadDiaryFunc = async () => {
            const result = await loadDiary(userId, selectDate).then(
                (res) => res,
            );
            if (result) {
                dispatch(diaryAction.setDiaryList(Object.values(result)));
            } else {
                dispatch(diaryAction.setDiaryList([]));
            }
        };
        loadDiaryFunc();
    }, [selectDate]);

    return (
        <>
            <Calendar
                onChange={(value: Date) => {
                    dispatch(settingAction.setSelectDate(value));
                }}
                defaultValue={new Date()}
                value={selectDate}
            />

            <div>
                {diaryList.length > 0 ? (
                    diaryList.map((d, index) => {
                        return (
                            <div key={index} style={{ display: "flex" }}>
                                <div>작성자: {d.id}</div>
                                <div>제목: {d.title}</div>
                            </div>
                        );
                    })
                ) : (
                    <div>해당 날짜에 작성된 일기가 없습니다.</div>
                )}
            </div>
        </>
    );
}
