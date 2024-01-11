"use client";
import CartItem from "@/components/cart-item-card";
import BackBtnIcon from "@/components/icons/back-btn";
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
  width: 50%;
  padding: 36px 89px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  gap: 16px;
`;

const SaleTotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;

  button {
    margin-top: 64px;
    padding: 16px 36px;
    background-color: var(--primary-button);
    border: none;
    color: white;
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    cursor: pointer;
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
              <h2>Valor total da compra:</h2>
              <h2>{formatPrice(cartTotal)}</h2>
              <button onClick={() => handleNavigateCheckout()}>Finalizar compra</button>
            </SaleTotalContainer>
          </>
        </MainWrapper>
      )}
    </Container>
  );
}

export default Page;
