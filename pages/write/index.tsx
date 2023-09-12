import TypingInput from "@src/customComponent/TypingInput";
import TypingTextArea from "@src/customComponent/TypingTextarea";
import useAuth from "@src/hooks/useAuth";
import { RootState } from "@src/store";
import { diaryAction } from "@src/store/reducer/diary/diary";
import { Div400 } from "@src/styledComponent/Div400";
import { FlexDiv } from "@src/styledComponent/FlexDiv";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function Page() {
    useAuth();

    const diaryNew = useSelector((state: RootState) => state.diary.diaryNew);
    const dispatch = useDispatch();

    return (
        <Div400>
            <FlexDiv>
                <SubTitle>일기제목</SubTitle>
                <TypingInput
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
                <SubTitle>일기내용</SubTitle>
                <TypingTextArea
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
        </Div400>
    );
}

const SubTitle = styled.div`
    width: 100px;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #202421;
`;
