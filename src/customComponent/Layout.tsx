import { useSelector } from "react-redux";
import Login from "@src/Containers/Login";
import { RootState } from "@src/store";
import Main from "@src/Containers/Main";
import styled from "styled-components";
import Header from "@src/Containers/Header";
import React, { ReactNode } from "react";
import { RootDiv } from "@src/styledComponent/RootDiv";
import { Div512 } from "@src/styledComponent/Div512";
import MainCalander from "@src/Containers/MainCalander";

interface WrapperProps {
    children: ReactNode;
}
export default function Layout({ children }) {
    return (
        <RootDiv>
            <Div512>
                <div>{children}</div>
            </Div512>
            <Div512 style={{ backgroundColor: "white" }}>
                <Header />
                <MainCalander />
            </Div512>
        </RootDiv>
    );
}
