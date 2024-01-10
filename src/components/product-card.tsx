import { formatPrice } from "@/helpers/formatPrice";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

interface ProductCardProps {
  name: string;
  price: number;
  photo: string;
  id: string;
}

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;

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

  &:hover {
    scale: 1.05;
    transition: 0.3s;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`

function ProductCard(product: ProductCardProps) {
  const router = useRouter()

  const handleNavigateProduct = () => {
    router.push(`/product?id=${product.id}`)
  }

  return (
    <ProductContainer onClick={() => handleNavigateProduct()}>
      <img src={product.photo} alt="" />
      <h4>{product.name}</h4>
      <h3>{formatPrice(product.price)}</h3>
      <button>Adicionar ao carrinho</button>
    </ProductContainer>
  );
}

export default ProductCard;
