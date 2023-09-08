import React from "react";
import { useSelector } from "react-redux";
import Login from "@src/Containers/Login";
import { RootState } from "@src/store";
import Main from "@src/Containers/Main";
import styled from "styled-components";
import Header from "@src/Containers/Header";

export default function Layout() {
    return (
        <RootDiv>
            <Header />
        </RootDiv>
    );
}

const RootDiv = styled.div`
    position: relative;
`;
