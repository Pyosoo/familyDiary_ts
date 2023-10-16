import React from "react";
import styled from "styled-components";

interface TypingInputProps {
    onTyping(str: string): void;
    value: string;
    placeholder: string;
}

export default function TypingInput({
    onTyping,
    value,
    placeholder,
}: TypingInputProps) {
    return (
        <TypingInputDiv
            placeholder={placeholder}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onTyping(event.target.value);
            }}
        />
    );
}

const TypingInputDiv = styled.input`
    width: 250px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: 1px solid #83ab82;
    border-width: 0 0 2px 0;
    outline: none;
    text-align: center;
    &:focus {
        border: 1px solid #83ab82;
        border-width: 0 0 2px 0;
        outline: none;
    },
`;
