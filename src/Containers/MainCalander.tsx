import * as React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { settingAction } from "@src/store/reducer/setting/setting";
import { loadDiary } from "@src/apis/apis";
import { diaryAction } from "@src/store/reducer/diary/diary";
import ListTable from "@src/customComponent/ListTable";
import { LoadingOutlined } from "@ant-design/icons";
import { RootDiv } from "@src/styledComponent/RootDiv";

interface itemInterface {
    id: string;
    title: string;
    content: string;
}

export default function MainCalander() {
    const selectDate = useSelector(
        (state: RootState) => state.setting.selectDate,
    );
    const userId = useSelector((state: RootState) => state.user.userInfo.id);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const loadDiaryFunc = async () => {
            const result = await loadDiary(userId, selectDate).then(
                (res) => res,
            );
            if (result) {
                dispatch(diaryAction.setDiaryList(result as itemInterface[]));
            } else {
                dispatch(diaryAction.setDiaryList([]));
            }
        };
        loadDiaryFunc();
    }, [selectDate]);

    const handleChangeSelectDate = (value: Date) => {
        dispatch(settingAction.setSelectDate(value));
    };

    return (
        <div style={{ display: "flex" }}>
            <div
                style={{
                    width: 512,
                    height: 780,
                }}>
                <Calendar
                    onChange={(value: Date) => {
                        console.log("실행");
                        dispatch(settingAction.setSelectDate(value));
                    }}
                    defaultValue={new Date()}
                    value={selectDate}
                />
            </div>
        </div>
    );
}
