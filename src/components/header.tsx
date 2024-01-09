"use client";
import styled from "styled-components";
import Logo from "./icons/logo";
import SearchInput from "./search-input";
import CartControl from "./cart-control";

interface HeaderProps {
  
}

const TagHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 36px;
  background-color: var(--secondary-bg);
`
const InputWrapper = styled.div`
  cursor: pointer;
`

const LogoWrapper = styled.div`
  cursor: pointer;
`

const CartWrapper = styled.div`
  cursor: pointer;
`

export default function Header(props: HeaderProps) {
  return (
    <TagHeader>
      <InputWrapper><SearchInput /></InputWrapper>
      <LogoWrapper><Logo /></LogoWrapper>
      <CartWrapper><CartControl /></CartWrapper>
    </TagHeader>
  )
}