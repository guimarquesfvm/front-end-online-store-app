"use client";
import styled from "styled-components";
import Logo from "./icons/logo";
import SearchInput from "./search-input";
import CartControl from "./cart-control";
import { useRouter } from "next/navigation";

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