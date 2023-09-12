import React from "react";
import styled from "styled-components";

export default function MyPage() {
    return (
        <>
            <SectionDiv>
                <h3>그룹 관리</h3>
                1인 1그룹을 원칙으로 함. 그룹장일시 다른그룹 참여불가.
                그룹원일시 그룹생성 불가.
                <div onClick={(e) => {}}>그룹 생성</div>
            </SectionDiv>
        </>
    );
}

const SectionDiv = styled.div`
    margin: 15px 0;
    border: 1px solid gray;
    border-radius: 5px;
`;
