import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "src/store/reducer/user/user";
import { TitleDiv } from "@src/styledComponent/TitleDiv";
import { CheckInput } from "@src/styledComponent/CheckInput";
import { RootState } from "src/store";
import { AddUser, CheckUser, getUser } from "src/apis/apis";
import { settingAction } from "@src/store/reducer/setting/setting";
import { RootDiv } from "@src/styledComponent/RootDiv";
import Image from "next/image";
import { MarginAutoDiv } from "@src/styledComponent/MarginAutoDiv";
import styled from "styled-components";

const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;

const Login = () => {
    const email = useSelector((state: RootState) => state.user.email);
    const password = useSelector((state: RootState) => state.user.password);
    const dispatch = useDispatch();

    //이메일 검사 validation

    return (
        <RootDiv
            style={{
                backgroundImage: `url('/Images/login_back.png')`,
            }}>
            <MarginAutoDiv>
                <Image
                    src="/Images/logo_text.png"
                    width={676}
                    height={183}
                    alt="logo"
                />
            </MarginAutoDiv>
            <MarginAutoDiv
                style={{
                    width: 350,
                    height: 350,
                    backgroundColor: "white",
                    borderRadius: 200,
                }}>
                <div style={{ paddingTop: 50, marginLeft: 30 }}>
                    <Image
                        src="/Images/house.png"
                        width={299}
                        height={235}
                        alt="logo"
                    />
                </div>
            </MarginAutoDiv>
            <div style={{ display: "flex" }}>
                <MarginAutoDiv>
                    <TitleDiv>ID</TitleDiv>
                    <CheckInput
                        formatcheck={expression.test(email).toString()}
                        placeholder="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            dispatch(userAction.user_setEmail(e.target.value))
                        }
                    />
                </MarginAutoDiv>
                <MarginAutoDiv>
                    <TitleDiv>Password</TitleDiv>
                    <CheckInput
                        formatcheck={"true"}
                        placeholder="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            dispatch(
                                userAction.user_setPassword(e.target.value),
                            )
                        }
                    />
                </MarginAutoDiv>
            </div>
            <MarginAutoDiv>
                <div>
                    <GreenButton
                        onClick={async () => {
                            const res = await CheckUser(email);
                            if (res) {
                                dispatch(
                                    settingAction.setSnackbar({
                                        snackbarOpen: true,
                                        snackbarType: "success",
                                        snackbarMessage:
                                            "로그인에 성공하였습니다.",
                                    }),
                                );
                                dispatch(settingAction.setIsLoginSuccess(true));
                                dispatch(
                                    userAction.setUserInfo({
                                        id: email,
                                    }),
                                );
                                const result = await getUser(email).then(
                                    (r) => r,
                                );
                                if (result) {
                                    console.log(result);
                                    dispatch(
                                        userAction.setUserInfo({
                                            id: email,
                                            groupLeader: result.groupLeader,
                                            group: result.groupLeader
                                                ? true
                                                : false,
                                        }),
                                    );
                                }

                                dispatch(userAction.user_setEmail(""));
                                dispatch(userAction.user_setPassword(""));
                            } else {
                                dispatch(
                                    settingAction.setSnackbar({
                                        snackbarOpen: true,
                                        snackbarType: "error",
                                        snackbarMessage:
                                            "로그인에 실패했습니다.",
                                    }),
                                );
                            }
                        }}>
                        SIGN IN
                    </GreenButton>
                </div>
                <div>
                    <GreenButton
                        onClick={async () => {
                            const res = await CheckUser(email);
                            if (res) {
                                dispatch(
                                    settingAction.setSnackbar({
                                        snackbarOpen: true,
                                        snackbarType: "error",
                                        snackbarMessage:
                                            "이미 등록된 아이디입니다.",
                                    }),
                                );
                            } else {
                                const res = await AddUser(email);
                                if (res.success) {
                                    dispatch(
                                        settingAction.setSnackbar({
                                            snackbarOpen: true,
                                            snackbarType: "success",
                                            snackbarMessage: res.message,
                                        }),
                                    );
                                } else {
                                    dispatch(
                                        settingAction.setSnackbar({
                                            snackbarOpen: true,
                                            snackbarType: "error",
                                            snackbarMessage: res.message,
                                        }),
                                    );
                                }
                            }
                        }}>
                        SIGN UP
                    </GreenButton>
                </div>
            </MarginAutoDiv>
        </RootDiv>
    );
};

export default Login;

const GreenButton = styled.button`
    width: 300px;
    height: 35px;
    line-height: 35px;
    vertical-align: middle;
    background-color: #066b1c;
    border: none;
    border-radius: 3px;
    color: white;
    margin-top: 30px;
    &:hover {
        background-color: green;
        cursor: pointer;
    }
`;
