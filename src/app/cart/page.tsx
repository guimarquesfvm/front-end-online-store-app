"use client";
import CartItem from "@/components/cart-item-card";
import BackBtnIcon from "@/components/icons/back-btn";
import PrimaryButton from "@/components/primary-button";
import { StoreContext } from "@/context/StoreContext";
import { formatPrice } from "@/helpers/formatPrice";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 36px 48px;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--primary-button);
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
`;

const MainWrapper = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px 36px;
  width: 50%;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  gap: 16px;
  
  @media (min-width: ${({ theme }) => theme.largeScreenBreakpoint}) {
    padding: 36px 89px;
  }
`;

const SaleTotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  gap: 16px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const NoCartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  h1 {
    font-size: 30px;
    font-weight: 600;
    line-height: 31px;
    letter-spacing: 0.055em;
    text-align: center;
    color: var(--primary-button);
  }
`;

function Page() {
  const { cartItems, cartTotal } = useContext(StoreContext);
  const router = useRouter();
  const handleNavigateCheckout = () => {
    router.push("/checkout");
  }

  return (
    <Container>
      <BackButton>
        <BackBtnIcon />
        Voltar
      </BackButton>
      {cartItems?.length === 0 ? (
        <NoCartItemsContainer>
          <h1>SEU CARRINHO ESTÁ VAZIO</h1>
        </NoCartItemsContainer>
      ) : (
        <MainWrapper>
          <>
            <CartItemsContainer>
              <h2>Carrinho de Compras</h2>
              {cartItems?.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </CartItemsContainer>
            <SaleTotalContainer>
              <div>
                <h2>Valor total da compra:</h2>
                <h2>{formatPrice(cartTotal)}</h2>
              </div>
              <PrimaryButton handler={handleNavigateCheckout} title="Finalizar compra"/>
            </SaleTotalContainer>
          </>
        </MainWrapper>
      )}
    </Container>
  );
}

export default Page;
