import { styled } from "styled-components";

interface InputProps {
    formatcheck?: boolean | string;
}

export const CheckInput = styled.input<InputProps>`
    background-color: ${(props) => (props.formatcheck ? "white" : "#FFAAC4")};
    border-color: ${(props) => (props.formatcheck ? "pink" : "#FFAAC4")};
    border-radius: 5px;
    width: 350px;
    height: 35px;
    line-height: 35px;
    border-width: 2px 4px 2px 4px;
    border-style: solid;
    outline: none;
    padding: 0 15px;
`;
