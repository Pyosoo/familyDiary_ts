import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { settingAction } from "@src/store/reducer/setting/setting";
import { userAction } from "@src/store/reducer/user/user";
import { useRouter } from "next/router";

export default function Header() {
    const dispatch = useDispatch();
    const router = useRouter();

    const changeRouter = (path: string) => {
        router.push(path);
    };

    return (
        <MyHeader>
            <TitleDiv onClick={() => changeRouter("/")}>
                패밀리 다이어리
            </TitleDiv>

            <SubLine>
                <SubTitleDiv onClick={() => changeRouter("/write")}>
                    일기쓰기
                </SubTitleDiv>
                <SubTitleDiv onClick={() => changeRouter("/mypage")}>
                    MyPage
                </SubTitleDiv>
                <LogoutBtn
                    onClick={(
                        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                    ) => {
                        dispatch(settingAction.setIsLoginSuccess(false));
                        dispatch(settingAction.setLoginId(""));
                        dispatch(userAction.user_setEmail(""));
                        dispatch(userAction.user_setPassword(""));
                    }}>
                    로그아웃
                </LogoutBtn>
            </SubLine>
        </MyHeader>
    );
}

const MyHeader = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    background-color: yellow;
    justify-content: center;
`;

const LogoutBtn = styled.button`
    background-color: transparent;
    color: black;
`;

const SubLine = styled.div`
    margin-left: auto;
    display: flex;
`;

const TitleDiv = styled.div`
    font-size: 1.2rem;
    color: blue;
    font-weight: bold;
`;

const SubTitleDiv = styled.div`
    font-size: 1rem;
    color: black;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`;
