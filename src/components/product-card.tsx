import React from "react";
import styled from "styled-components";

interface ProductCardProps {
  name: string;
  price: number;
  photo: string;
}

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: center;

  width: 280px;
  height: auto;

  img {
    width: 100%;
    height: 100%;
  }

  button {
    padding: 14px 36px;
    background-color: var(--primary-button);
    border: none;

    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    color: white;
  }
`

function ProductCard(product: ProductCardProps) {
  return (
    <ProductContainer>
      <img src={product.photo} alt="" />
      <h4>{product.name}</h4>
      <h3>{product.price}</h3>
      <button>Adicionar ao carrinho</button>
    </ProductContainer>
  );
}

export default ProductCard;
