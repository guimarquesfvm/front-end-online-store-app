import { useContext } from "react";
import Cart from "./icons/cart";
import styled from "styled-components";
import { StoreContext } from "@/context/StoreContext";

const CartContainer = styled.div`
  position: relative;
`;

const CartCount = styled.span`
  background-color: var(--primary-button);
  color: white;
  font-weight: 700;
  border-radius: 100%;
  padding: 4px 8px;
  position: absolute;
  left: 24px;
  bottom: 50%;
`;

function CartControl() {
  const {cartItems} = useContext(StoreContext);

  return (
    <CartContainer>
      <Cart />
      {cartItems && <CartCount>{cartItems.length}</CartCount>}
    </CartContainer>
  );
}

export default CartControl;
