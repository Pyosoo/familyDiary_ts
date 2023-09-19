import { useSelector } from "react-redux";
import Login from "@src/Containers/Login";
import { RootState } from "@src/store";
import Main from "@src/Containers/Main";
import styled from "styled-components";
import Header from "@src/Containers/Header";
import React, { ReactNode } from "react";
import { RootDiv } from "@src/styledComponent/RootDiv";

interface WrapperProps {
    children: ReactNode;
}
export default function Layout({ children }) {
    return (
        <RootDiv>
            <Header />
            <div style={{ paddingTop: "50px" }}>{children}</div>
        </RootDiv>
    );
}
