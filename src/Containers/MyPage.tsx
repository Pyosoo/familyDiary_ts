import React from "react";
import styled from "styled-components";

export default function MyPage() {
    return (
        <>
            <SectionDiv>
                <h3>그룹 관리</h3>
            </SectionDiv>
        </>
    );
}

const SectionDiv = styled.div`
    margin: 15px 0;
    border: 1px solid gray;
    border-radius: 5px;
`;
