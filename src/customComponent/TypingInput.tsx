import React from "react";
import styled from "styled-components";

interface TypingInputProps {
    onTyping(str: string): void;
    value: string;
}

export default function TypingInput({ onTyping, value }: TypingInputProps) {
    return (
        <TypingInputDiv
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onTyping(event.target.value);
            }}
        />
    );
}

const TypingInputDiv = styled.input`
    width: 250px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    border: 1px solid #21649c;
    &:focus {
        border: 1px solid #21889c;
    }
`;
