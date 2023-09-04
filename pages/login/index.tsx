import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/reducer/user/user";
import { TitleDiv } from "customComponent/TitleDiv";
import { CheckInput } from "customComponent/CheckInput";
import { RootUserState } from "../../store/reducer/user/user";
import { AddUser, ReadUser } from "apis/apis";

const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;

const Login = () => {
    const email = useSelector((state: RootUserState) => state.user.email);
    const password = useSelector((state: RootUserState) => state.user.password);
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
            <button onClick={() => AddUser(email)}>테스트</button>
        </div>
    );
};

export default Login;
