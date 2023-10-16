import { writeDiary } from "@src/apis/apis";
import TypingInput from "@src/customComponent/TypingInput";
import TypingTextArea from "@src/customComponent/TypingTextarea";
import useAuth from "@src/hooks/useAuth";
import { RootState } from "@src/store";
import { diaryAction } from "@src/store/reducer/diary/diary";
import { settingAction } from "@src/store/reducer/setting/setting";
import { PaperDiv } from "@src/styledComponent/PaperDiv";
import { Div400 } from "@src/styledComponent/Div400";
import { FlexDiv } from "@src/styledComponent/FlexDiv";
import { Router, useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Image from "next/image";
import { MyButton } from "@src/customComponent/MyBUtton";

export default function Page() {
    useAuth();
    const router = useRouter();
    const userId = useSelector((state: RootState) => state.user.userInfo.id);
    const diaryNew = useSelector((state: RootState) => state.diary.diaryNew);
    const dispatch = useDispatch();

    const writeDiaryFunc = async () => {
        if (
            diaryNew.title.trim().length < 1 ||
            diaryNew.content.trim().length < 1
        ) {
            dispatch(
                settingAction.setSnackbar({
                    snackbarOpen: true,
                    snackbarType: "error",
                    snackbarMessage: "일기를 작성해주세요.",
                }),
            );
            return;
        }

        const result = await writeDiary(
            userId,
            diaryNew.title,
            diaryNew.content,
        ).then((res) => res);

        if (result.success) {
            dispatch(
                settingAction.setSnackbar({
                    snackbarOpen: true,
                    snackbarType: "success",
                    snackbarMessage: result.message,
                }),
            );
            dispatch(
                diaryAction.setDiaryNew({
                    title: "",
                    content: "",
                }),
            );
            router.push("/");
        } else {
            dispatch(
                settingAction.setSnackbar({
                    snackbarOpen: true,
                    snackbarType: "error",
                    snackbarMessage: result.message,
                }),
            );
        }
    };

    return (
        <PaperDiv>
            <div style={{ position: "absolute", top: -38, left: 215 }}>
                <Image alt="" src={"/Images/pen.png"} width={25} height={25} />
            </div>
            <FlexDiv>
                <TypingInput
                    placeholder="제목을 적어주세요"
                    value={diaryNew.title}
                    onTyping={(str: string) =>
                        dispatch(
                            diaryAction.setDiaryNew({
                                title: str,
                                content: diaryNew.content,
                            }),
                        )
                    }
                />
            </FlexDiv>
            <FlexDiv>
                <TypingTextArea
                    placeholder="오늘 하루는 어땠나요?"
                    value={diaryNew.content}
                    onTyping={(str: string) =>
                        dispatch(
                            diaryAction.setDiaryNew({
                                title: diaryNew.title,
                                content: str,
                            }),
                        )
                    }
                />
            </FlexDiv>

            <MyButton onClick={writeDiaryFunc}>작성</MyButton>
        </PaperDiv>
    );
}
