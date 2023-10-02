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
    const diaryList = useSelector((state: RootState) => state.diary.diaryList);
    const [diaryLoading, setDiaryLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const loadDiaryFunc = async () => {
            setDiaryLoading(true);
            const result = await loadDiary(userId, selectDate).then(
                (res) => res,
            );
            if (result) {
                setDiaryLoading(false);
                dispatch(diaryAction.setDiaryList(result as itemInterface[]));
            } else {
                setDiaryLoading(false);
                dispatch(diaryAction.setDiaryList([]));
            }
        };
        loadDiaryFunc();
    }, [selectDate]);

    const handleChangeSelectDate = (value: Date) => {
        dispatch(settingAction.setSelectDate(value));
    };

    return (
        <>
            <Calendar
                onChange={(value: Date) => handleChangeSelectDate(value)}
                defaultValue={new Date()}
                value={selectDate}
            />

            <div>
                {diaryLoading ? (
                    <LoadingOutlined />
                ) : diaryList.length > 0 ? (
                    <ListTable />
                ) : (
                    <div>해당 날짜에 작성된 일기가 없습니다.</div>
                )}
            </div>
        </>
    );
}
