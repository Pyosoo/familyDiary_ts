import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "src/store/reducer/user/user";
import { TitleDiv } from "src/customComponent/TitleDiv";
import { CheckInput } from "src/customComponent/CheckInput";
import { RootState } from "src/store";
import { AddUser, CheckUser } from "src/apis/apis";
import { settingAction } from "@src/store/reducer/setting/setting";

const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;

const Login = () => {
    const email = useSelector((state: RootState) => state.user.email);
    const password = useSelector((state: RootState) => state.user.password);
    const dispatch = useDispatch();

    //이메일 검사 validation

    return (
        <div>
            Login 컴포넌트
            <div>
                <TitleDiv>이메일주소</TitleDiv>
                <CheckInput
                    formatcheck={expression.test(email).toString()}
                    placeholder="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch(userAction.user_setEmail(e.target.value))
                    }
                />
            </div>
            <div>
                <TitleDiv>비밀번호</TitleDiv>
                <CheckInput
                    formatcheck={"true"}
                    placeholder="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch(userAction.user_setPassword(e.target.value))
                    }
                />
            </div>
            <button
                onClick={async () => {
                    const res = await CheckUser(email);
                    if (res) {
                        dispatch(
                            settingAction.setSnackbar({
                                snackbarOpen: true,
                                snackbarType: "success",
                                snackbarMessage: "로그인에 성공하였습니다.",
                            }),
                        );
                        dispatch(settingAction.setIsLoginSuccess(true));
                        dispatch(settingAction.setLoginId(email));
                    } else {
                        dispatch(
                            settingAction.setSnackbar({
                                snackbarOpen: true,
                                snackbarType: "error",
                                snackbarMessage: "로그인에 실패했습니다.",
                            }),
                        );
                    }
                }}>
                로그인
            </button>
            <button
                onClick={async () => {
                    const res = await CheckUser(email);
                    if (res) {
                        dispatch(
                            settingAction.setSnackbar({
                                snackbarOpen: true,
                                snackbarType: "error",
                                snackbarMessage: "이미 등록된 아이디입니다.",
                            }),
                        );
                    } else {
                        const res = await AddUser(email);
                        if (res) {
                            dispatch(
                                settingAction.setSnackbar({
                                    snackbarOpen: true,
                                    snackbarType: "success",
                                    snackbarMessage:
                                        "회원가입에 성공하였습니다.",
                                }),
                            );
                        } else {
                            dispatch(
                                settingAction.setSnackbar({
                                    snackbarOpen: true,
                                    snackbarType: "error",
                                    snackbarMessage: res,
                                }),
                            );
                        }
                    }
                }}>
                회원가입
            </button>
        </div>
    );
};

export default Login;
