import { settingAction } from "@src/store/reducer/setting/setting";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function Header() {
    const dispatch = useDispatch();

    return (
        <MyHeader>
            <LogoutBtn
                onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ) => {
                    dispatch(settingAction.setIsLoginSuccess(false));
                    dispatch(settingAction.setLoginId(""));
                }}>
                로그아웃
            </LogoutBtn>
        </MyHeader>
    );
}

const MyHeader = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;
    background-color: yellow;
`;

const LogoutBtn = styled.button`
    margin-left: auto;
    background-color: transparent;
    color: black;
`;
