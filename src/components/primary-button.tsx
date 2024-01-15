import React from "react";
import styled from "styled-components";

interface ButtonProps {
  title: string;
  handler: () => void;
  disabled?: boolean;
}

const PrimaryButtonStyled = styled.button`
  padding: 16px 36px;
  background-color: var(--primary-button);
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background-color: var(--primary-button-hover);
  }

  &:active {
    background-color: var(--primary-button-active);
  }
`;
function PrimaryButton({ title, disabled, handler }: ButtonProps) {
  return (
    <PrimaryButtonStyled disabled={disabled} onClick={() => handler()}>
      {title}
    </PrimaryButtonStyled>
  );
}

export default PrimaryButton;
