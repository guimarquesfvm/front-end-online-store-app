"use client";
import { formatPrice } from "@/helpers/formatPrice";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import RemoveCartItem from "./icons/remove-cart-item";
import { StoreContext } from "@/context/StoreContext";
import { ProductType } from "@/types";

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  border-top: 1px solid var(--secondary-text);

  .remove-btn-and-photo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
  }

  @media (min-width: ${({ theme }) => theme.largeScreenBreakpoint}) {
    flex-direction: row;
  }
`;

const RemoveBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

function CheckoutItemCard({ item }: { item: ProductType }) {
  const { cartItems, setCartItems, setCartTotal } = useContext(StoreContext);

  const handleRemoveItem = () => {
    setCartItems([...cartItems].filter((i: ProductType) => i.id !== item.id));
  }

  useEffect(() => {
    setCartTotal(cartItems.reduce((acc: any, item: ProductType) => acc + item.price * item.quantity!!, 0));
  })
  
  return (
    <CartItemContainer>
      <div className="remove-btn-and-photo">
        <RemoveBtn onClick={() => handleRemoveItem()}>
          <RemoveCartItem />
        </RemoveBtn>
        <img src={item.thumbnail} alt="" />
      </div>
      <h4>{item.title}</h4>
      <h4>{formatPrice(item.price)}</h4>
    </CartItemContainer>
  );
}

export default CheckoutItemCard;
