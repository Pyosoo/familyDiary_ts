import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";

function createData(id: string, title: string) {
    return { id, title };
}

interface itemInterface {
    id: string;
    title: string;
    content: string;
}

export default function ListTable() {
    const diaryList = useSelector((state: RootState) => state.diary.diaryList);
    return (
        <TableContainer component={Paper} style={{ maxHeight: 460 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell align="left">작성자</TableCell>
                        <TableCell align="left">제목</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {diaryList
                        .map((item: itemInterface) =>
                            createData(item.id, item.title),
                        )
                        .map((row, i) => (
                            <TableRow
                                key={i + row.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.title}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
