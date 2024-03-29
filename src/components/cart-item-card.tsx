"use client";
import { formatPrice } from "@/helpers/formatPrice";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import RemoveCartItem from "./icons/remove-cart-item";
import { StoreContext } from "@/context/StoreContext";
import { ProductType } from "@/types";

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  border-top: 1px solid var(--secondary-text);
  flex-direction: column;

  .column-card-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

const QuantityHandler = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 28px;
    color: var(--secondary-text);
  }

  span {
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
    color: white;
    background-color: var(--secondary-text);
    height: 24px;
    width: 24px;
    padding: 5px;
    text-align: center;
    border-radius: 50%;
    display: inline-block;
  }
`;
function CartItem({ item }: { item: ProductType }) {
  const { cartItems, setCartItems, setCartTotal, cartTotal } = useContext(StoreContext);
  const [itemQuantity, setItemQuantity] = useState(item.quantity);

  const itemIndex = cartItems.findIndex((i) => i.id === item.id);

  const handleQuantity = (operation: string) => {
    let newCartItems = cartItems;
    if (operation === "+") {
      newCartItems[itemIndex].quantity!! += 1;
      setCartItems(newCartItems);
    }
    if (operation === "-") {
      if (newCartItems[itemIndex].quantity === 1) return;
      newCartItems[itemIndex].quantity!! -= 1;
      setCartItems(newCartItems);
    }
    setItemQuantity(newCartItems[itemIndex].quantity);
  }

  const handleRemoveItem = () => {
    setCartItems([...cartItems].filter((i) => i.id !== item.id));
  }

  useEffect(() => {
    setCartTotal(cartItems.reduce((acc: any, item) => acc + item.price * item.quantity!!, 0));
  })
  
  return (
    <CartItemContainer>
      <div className="column-card-container">
        <RemoveBtn onClick={() => handleRemoveItem()}>
          <RemoveCartItem />
        </RemoveBtn>
        <img src={item.thumbnail} alt="" />
        <h4>{item.title}</h4>
      </div>
      <div className="column-card-container">
        <QuantityHandler>
          <button onClick={() => handleQuantity("-")}>-</button>
          <span>{itemQuantity}</span>
          <button onClick={() => handleQuantity("+")}>+</button>
        </QuantityHandler>
        <h4>{formatPrice(item.price)}</h4>
      </div>
    </CartItemContainer>
  );
}

export default CartItem;
