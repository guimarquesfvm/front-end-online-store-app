import { StoreContext } from "@/context/StoreContext";
import { formatPrice } from "@/helpers/formatPrice";
import useProduct from "@/hooks/useProduct";
import { ProductType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import styled from "styled-components";
import PrimaryButton from "./primary-button";

interface ProductCardProps {
  product: ProductType;
}

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  text-align: center;
  
  width: 200px;
  height: auto;
  
  img {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  &:hover {
    scale: 1.05;
    transition: 0.3s;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  @media (min-width : ${({ theme }) => theme.desktopBreakpoint}) {
    width: 280px;
  }
`

function ProductCard({ product }: ProductCardProps) {
  const { data } = useProduct(product.id);
  const {cartItems, setCartItems} = useContext(StoreContext)
  const router = useRouter()

  const handleNavigateProduct = () => {
    router.push(`/product?id=${product.id}`)
  }

  const handleAddToCart = () => {
    const itemExists = cartItems.findIndex((item) => item.id === data?.id);
    if (itemExists !== -1) {
      return;
    } else {
      setCartItems([...cartItems, { ...data, quantity: 1 }]);
    }
  };

  return (
    <ProductContainer>
      <img src={product.thumbnail} alt="foto do produto" onClick={() => handleNavigateProduct()}/>
      <h4>{product.title}</h4>
      <h3>{formatPrice(product.price)}</h3>
      <PrimaryButton handler={() => handleAddToCart()} title="Adicionar ao carrinho"/>
    </ProductContainer>
  );
}

export default ProductCard;
