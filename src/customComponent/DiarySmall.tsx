import { styled } from "styled-components";

const back2 = "/Images/box_back.png";

export const DiarySmall = styled.div`
    width: 420px;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px;
    border: 4px solid green;
    background-image: url(${back2});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    &:hover {
        cursor: pointer;
    }
`;
