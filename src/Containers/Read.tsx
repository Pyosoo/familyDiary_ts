import { DiarySmall } from "@src/customComponent/DiarySmall";
import { RootState } from "@src/store";
import { diaryAction } from "@src/store/reducer/diary/diary";
import { settingAction } from "@src/store/reducer/setting/setting";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Read(props) {
    const DiaryList = useSelector((state: RootState) => state.diary.diaryList);
    const selectDate = useSelector(
        (state: RootState) => state.setting.selectDate,
    );
    const dispatch = useDispatch();

    return (
        <>
            <div
                style={{
                    fontSize: 21,
                    fontWeight: 800,
                    textAlign: "center",
                    color: "#83ab82",
                    marginTop: 10,
                }}>
                {moment(selectDate).utc(true).format("YYYY.MM.DD")}
            </div>
            {DiaryList.length > 0 ? (
                DiaryList.map((diary) => {
                    return (
                        <DiarySmall
                            onClick={() => {
                                dispatch(
                                    diaryAction.setDiaryInfo({
                                        id: diary.id,
                                        title: diary.title,
                                        content: diary.content,
                                    }),
                                );
                                dispatch(settingAction.setDiaryModalOpen(true));
                            }}>
                            <h4>
                                ({diary.id}){diary.title}
                            </h4>
                            <div
                                style={{
                                    fontSize: 13,
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    maxHeight: 20,
                                }}>
                                {diary.content}
                            </div>
                        </DiarySmall>
                    );
                })
            ) : (
                <div
                    style={{
                        textAlign: "center",
                        marginTop: 300,
                        fontWeight: 800,
                    }}>
                    이날의 첫 일기를 작성해보세요!
                </div>
            )}
        </>
    );
}

export default Read;
