import { styled } from "styled-components";

export const MyButton = styled.button`
    width: 100px;
    height: 25px;
    line-height: 25px;
    vertical-align: middle;
    border: none;
    background-color: #83ab82;
    display: block;
    margin-left: auto;
    margin-right: auto;
    color: white;
    &:hover {
        cursor: pointer;
        background-color: #739672;
    },
`;
