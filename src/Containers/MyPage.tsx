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
import { green } from "@mui/material/colors";

export default function MyPage() {
    const [inviteMember, setInviteMember] = useState<string>("");

    const dispatch = useDispatch();

    const userId = useSelector((state: RootState) => state.user.userInfo.id);
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
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
            console.log(data);
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
                <div>그룹은 1인 1그룹만 가능합니다.</div>
                <div>그룹에 소속되어있을 경우 그룹 생성이 불가능합니다.</div>
                <div>그룹장 이외엔 그룹 초대/추방이 불가능합니다.</div>
                <div>일기는 1일 1회만 작성 가능합니다.</div>
                <MyButton
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
                </MyButton>
            </SectionDiv>
            <hr />
            <SectionDiv>
                <div>
                    <div>그룹원 초대하기</div>
                    <input
                        value={inviteMember}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setInviteMember(e.target.value)
                        }
                    />
                    <MyButton onClick={handleInviteGroup}>초대</MyButton>
                </div>

                <hr />
                <div>그룹원 리스트</div>
                <div>
                    {groupList
                        .filter((member) => member !== userId)
                        .map((d, i) => {
                            return (
                                <div key={i}>
                                    {d}
                                    {userInfo.groupLeader === userId ? (
                                        <MyButton
                                            onClick={async () => {
                                                const result =
                                                    await deleteGroupMember(
                                                        userId,
                                                        d,
                                                    );
                                                if (result.success) {
                                                    dispatch(
                                                        settingAction.setSnackbar(
                                                            {
                                                                snackbarOpen:
                                                                    true,
                                                                snackbarType:
                                                                    "success",
                                                                snackbarMessage:
                                                                    result.message,
                                                            },
                                                        ),
                                                    );
                                                    dispatch(
                                                        diaryAction.setGroupList(
                                                            groupList.filter(
                                                                (member) =>
                                                                    member !==
                                                                    d,
                                                            ),
                                                        ),
                                                    );
                                                } else {
                                                    dispatch(
                                                        settingAction.setSnackbar(
                                                            {
                                                                snackbarOpen:
                                                                    true,
                                                                snackbarType:
                                                                    "error",
                                                                snackbarMessage:
                                                                    result.message,
                                                            },
                                                        ),
                                                    );
                                                }
                                            }}>
                                            삭제
                                        </MyButton>
                                    ) : null}
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
    border-radius: 5px;
    color: #83ab82;
    font-weight: 800;
`;

const MyButton = styled.button`
    background-color: #83ab82;
    width: 100px;
    height: 25px;
    lineheight: "25px";
    border-radius: 3px;
    margin: 3px;
    color: white;
    outline: none;
    border: none;
    &:hover {
        cursor: pointer;
    }
`;
