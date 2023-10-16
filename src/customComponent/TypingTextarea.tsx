import React from "react";
import styled from "styled-components";

interface TypingTextareaProps {
    onTyping(str: string): void;
    value: string;
    placeholder;
}

export default function TypingTextArea({
    onTyping,
    placeholder,
    value,
}: TypingTextareaProps) {
    return (
        <TypingTextarea
            placeholder={placeholder}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                onTyping(event.target.value);
            }}
        />
    );
}

const TypingTextarea = styled.textarea`
    width: 250px;
    height: 200px;
    max-width: 250px;
    min-width: 250px
    min-height: 200px
    max-height: 450px;
    border-radius: 3px;
    border: 1px solid #83ab82;
    border-width: 2px 0 2px 0;
    outline: none;
    text-align: center;
    &:focus {
        border: 1px solid #83ab82;
        border-width: 2px 0 2px 0;
        outline: none;
    },
`;
