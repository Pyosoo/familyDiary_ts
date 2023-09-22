import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { settingAction } from "@src/store/reducer/setting/setting";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function DiaryModal() {
    const handleOpen = () => dispatch(settingAction.setDiaryModalOpen(true));
    const handleClose = () => dispatch(settingAction.setDiaryModalOpen(false));

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
                <Box sx={style}>modal</Box>
            </Modal>
        </div>
    );
}
