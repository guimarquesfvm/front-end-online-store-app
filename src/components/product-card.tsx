import { StoreContext } from "@/context/StoreContext";
import { formatPrice } from "@/helpers/formatPrice";
import useProduct from "@/hooks/useProduct";
import { ProductType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import styled from "styled-components";

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
  
  width: 280px;
  height: auto;
  
  img {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  button {
    padding: 14px 36px;
    background-color: var(--primary-button);
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    color: white;
  }

  &:hover {
    scale: 1.05;
    transition: 0.3s;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
      <button onClick={() => handleAddToCart() }>Adicionar ao carrinho</button>
    </ProductContainer>
  );
}

export default ProductCard;
