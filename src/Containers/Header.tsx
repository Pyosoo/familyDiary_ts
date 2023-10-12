import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { settingAction } from "@src/store/reducer/setting/setting";
import { userAction } from "@src/store/reducer/user/user";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Header() {
    const dispatch = useDispatch();
    const router = useRouter();

    const changeRouter = (path: string) => {
        router.push(path);
    };

    return (
        <MyHeader className="headerDiv">
            <div>
                <Image
                    src="/Images/logo.png"
                    width={50}
                    height={40}
                    alt="logo"
                />
            </div>
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
                        dispatch(
                            userAction.setUserInfo({
                                id: "",
                                group: false,
                                groupLeader: "",
                            }),
                        );
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
    width: 100%;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    background-color: yellow;
    justify-content: center;
    background-color: green;
`;

const LogoutBtn = styled.button`
    background-color: transparent;
    color: white;
    border: none;
    &:hover {
        cursor: pointer;
    }
`;

const SubLine = styled.div`
    margin-left: auto;
    display: flex;
    color: white;
`;

const TitleDiv = styled.div`
    font-size: 1.2rem;
    color: blue;
    color: white;
    &:hover {
        cursor: pointer;
        font-weight: bold;
    }
`;

const SubTitleDiv = styled.div`
    font-size: 1rem;
    margin-left: 5px;
    margin-right: 5px;
    &:hover {
        font-weight: bold;
        cursor: pointer;
    }
`;
