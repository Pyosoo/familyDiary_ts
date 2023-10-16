import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { settingAction } from "@src/store/reducer/setting/setting";
import { PaperDiv } from "@src/styledComponent/PaperDiv";
import Image from "next/image";
import { FlexDiv } from "@src/styledComponent/FlexDiv";
import styled from "styled-components";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -60%)",
    width: 400,
    height: 700,
    bgcolor: "background.paper",
    border: "10px solid #83ab82",
    boxShadow: 24,
    p: 4,
};

export default function DiaryModal() {
    const handleOpen = () => dispatch(settingAction.setDiaryModalOpen(true));
    const handleClose = () => dispatch(settingAction.setDiaryModalOpen(false));

    const diaryInfo = useSelector((state: RootState) => state.diary.diaryInfo);

    const open = useSelector(
        (state: RootState) => state.setting.diaryModalOpen,
    );
    const diaryModalData = useSelector(
        (state: RootState) => state.setting.diaryModalData,
    );

    const dispatch = useDispatch();

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <PaperDiv>
                    <div style={{ position: "absolute", top: -38, left: 215 }}>
                        <Image
                            alt=""
                            src={"/Images/pen.png"}
                            width={25}
                            height={25}
                        />
                    </div>
                    <FlexDiv>
                        <TypingInputDisable>{diaryInfo.id}</TypingInputDisable>
                    </FlexDiv>
                    <FlexDiv>
                        <TypingInputDisable>
                            {diaryInfo.title}
                        </TypingInputDisable>
                    </FlexDiv>
                    <FlexDiv>
                        <TypingTextareaDisable>
                            {diaryInfo.content}
                        </TypingTextareaDisable>
                    </FlexDiv>
                </PaperDiv>
            </Modal>
        </div>
    );
}

const TypingInputDisable = styled.div`
    width: 250px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: 1px solid #83ab82;
    border-width: 0 0 2px 0;
    outline: none;
    text-align: center;
    &:focus {
        border: 1px solid #83ab82;
        border-width: 0 0 2px 0;
        outline: none;
    },
`;
const TypingTextareaDisable = styled.div`
    width: 250px;
    height: 200px;
    max-width: 250px;
    min-width: 250px
    min-height: 200px
    max-height: 450px;
    border-radius: 3px;
    border: 1px solid #83ab82;
    border-width: 2px 0 2px 0;
    outline: none;
    text-align: center;
    &:focus {
        border: 1px solid #83ab82;
        border-width: 2px 0 2px 0;
        outline: none;
    },
`;
