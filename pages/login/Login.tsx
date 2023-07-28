import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckInput } from "custom/checkInput";
import { userAction } from "../../store/reducer/user/user";
import { TitleDiv } from "custom/TitleDiv";
import { fetchTest } from "store/reducer/user/thunk";
const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;

export const Login = () => {
    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);
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
                onClick={() =>
                    dispatch(
                        fetchTest({
                            email,
                            password,
                        }),
                    )
                }
            >
                테스트
            </button>
        </div>
    );
};
