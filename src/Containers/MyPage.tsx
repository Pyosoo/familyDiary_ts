import styled from "styled-components";
import React, { useEffect, useState } from "react";

import {
    deleteGroupMember,
    getGroupList,
    getUser,
    inviteGroup,
    makeGroup,
} from "@src/apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { settingAction } from "@src/store/reducer/setting/setting";
import { RootState } from "@src/store";
import { userAction } from "@src/store/reducer/user/user";
import { diaryAction } from "@src/store/reducer/diary/diary";

export default function MyPage() {
    const [inviteMember, setInviteMember] = useState<string>("");

    const dispatch = useDispatch();

    const userId = useSelector((state: RootState) => state.user.userInfo.id);
    const groupList = useSelector((state: RootState) => state.diary.groupList);

    useEffect(() => {
        async function getUserApi() {
            const data = await getUser(userId);
            if (data) {
                dispatch(userAction.setUserInfo(data.userId));
            }
        }
        getUserApi();

        async function getGroupApi() {
            const data = await getGroupList(userId);
            if (data) {
                dispatch(diaryAction.setGroupList(data));
            }
        }
        getGroupApi();
    }, []);

    const handleInviteGroup = async () => {
        const result = await inviteGroup(userId, inviteMember).then(
            (res) => res,
        );
        if (result.success) {
            dispatch(
                settingAction.setSnackbar({
                    snackbarOpen: true,
                    snackbarType: "success",
                    snackbarMessage: result.message,
                }),
            );
            dispatch(diaryAction.setGroupList([...groupList, inviteMember]));
            setInviteMember("");
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
        <>
            {/* {loginInfo.loginId} */}
            <h3 onClick={() => console.log(groupList)}>그룹 관리</h3>
            <SectionDiv>
                그룹 생성하기 1인 1그룹을 원칙으로 함. 그룹장일시 다른그룹
                참여불가. 그룹원일시 그룹생성 불가.
                <button
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
                </button>
            </SectionDiv>

            <SectionDiv>
                <div>
                    <input
                        value={inviteMember}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setInviteMember(e.target.value)
                        }
                    />
                    <button onClick={handleInviteGroup}>그룹초대</button>
                </div>

                <div>그룹원 리스트</div>
                <div>그룹장:</div>
                <div>
                    {groupList
                        .filter((member) => member !== userId)
                        .map((d, i) => {
                            return (
                                <div key={i}>
                                    {d}
                                    <button
                                        onClick={async () => {
                                            const result =
                                                await deleteGroupMember(
                                                    userId,
                                                    d,
                                                );
                                            if (result.success) {
                                                dispatch(
                                                    settingAction.setSnackbar({
                                                        snackbarOpen: true,
                                                        snackbarType: "success",
                                                        snackbarMessage:
                                                            result.message,
                                                    }),
                                                );
                                                dispatch(
                                                    diaryAction.setGroupList(
                                                        groupList.filter(
                                                            (member) =>
                                                                member !== d,
                                                        ),
                                                    ),
                                                );
                                            } else {
                                                dispatch(
                                                    settingAction.setSnackbar({
                                                        snackbarOpen: true,
                                                        snackbarType: "error",
                                                        snackbarMessage:
                                                            result.message,
                                                    }),
                                                );
                                            }
                                        }}>
                                        삭제
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </SectionDiv>
        </>
    );
}

const SectionDiv = styled.div`
    margin: 15px 0;
    border: 1px solid gray;
    border-radius: 5px;
`;
