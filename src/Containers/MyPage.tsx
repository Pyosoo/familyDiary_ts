import styled from "styled-components";
import React, { useEffect } from "react";

import { getUser, makeGroup } from "@src/apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { settingAction } from "@src/store/reducer/setting/setting";
import { RootState } from "@src/store";
import { userAction } from "@src/store/reducer/user/user";

export default function MyPage() {
    const dispatch = useDispatch();

    const userId = useSelector((state: RootState) => state.user.userInfo.id);

    useEffect(() => {
        async function getUserApi() {
            const data = await getUser(userId);
            console.log(data);
            if (data) {
                dispatch(userAction.setUserInfo(data.userId));
            }
        }
        getUserApi();
    }, []);
    return (
        <>
            {/* {loginInfo.loginId} */}
            <h3>그룹 관리</h3>
            <SectionDiv>
                그룹 생성하기 1인 1그룹을 원칙으로 함. 그룹장일시 다른그룹
                참여불가. 그룹원일시 그룹생성 불가.
                <div
                    onClick={async () => {
                        const result = await makeGroup(userId).then(
                            (res) => res,
                        );
                        console.log(result);
                        if (result.success) {
                            dispatch(
                                settingAction.setSnackbar({
                                    snackbarOpen: true,
                                    snackbarType: "success",
                                    snackbarMessage: result.message,
                                }),
                            );
                        } else {
                            dispatch(
                                settingAction.setSnackbar({
                                    snackbarOpen: true,
                                    snackbarType: "error",
                                    snackbarMessage: result.message,
                                }),
                            );
                        }
                    }}>
                    그룹 생성
                </div>
            </SectionDiv>

            <SectionDiv>그룹원리스트</SectionDiv>
        </>
    );
}

const SectionDiv = styled.div`
    margin: 15px 0;
    border: 1px solid gray;
    border-radius: 5px;
`;
