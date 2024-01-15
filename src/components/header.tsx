"use client";
import styled from "styled-components";
import Logo from "./icons/logo";
import SearchInput from "./search-input";
import CartControl from "./cart-control";
import { useRouter } from "next/navigation";

const TagHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  justify-content: space-between;
  background-color: var(--secondary-bg);
  
  @media (min-width: ${({ theme }) => theme.desktopBreakpoint}) {
    padding: 16px 36px;
  }
`
const InputWrapper = styled.div`
  cursor: pointer;
  &:hover, &:focus-within, &:focus {
    scale: 1.1;
    transition: 0.3s;
  }
`

const LogoWrapper = styled.div`
  cursor: pointer;

  &:hover {
    scale: 1.1;
    transition: 0.3s;
  }
`

const CartWrapper = styled.div`
  cursor: pointer;

  &:hover {
    scale: 1.1;
    transition: 0.3s;
  }
`

export default function Header() {
  const router = useRouter();
  const handleNavigateHome = () => {
    router.push("/")
  }
  const handleNavigateCart = () => {
    router.push("/cart")
  }

  return (
    <TagHeader>
      <InputWrapper><SearchInput /></InputWrapper>
      <LogoWrapper onClick={() => handleNavigateHome()}><Logo /></LogoWrapper>
      <CartWrapper onClick={() => handleNavigateCart()}><CartControl /></CartWrapper>
    </TagHeader>
  )
}