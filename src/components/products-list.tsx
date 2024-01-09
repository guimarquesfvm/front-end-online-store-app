"use client";
import { StoreContext } from "@/context/StoreContext";
import { useProducts } from "@/hooks/useProducts";
import React, { useContext } from "react";
import ProductCard from "./product-card";
import styled from "styled-components";

const ListContainer = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 28px;
  flex-grow: 1;
`;

const NoSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 24px;
  
  h1 {
    font-size: 32px;
    color: var(--primary-button);
  }

  h3 {
    font-size: 20px;
    color: var(--secondary-text);
  }
`;

function ProductsList() {
  const { query, selectedCategory } = useContext(StoreContext);
  const { products } = useProducts(selectedCategory, query);

  return (
    <ListContainer>
      {selectedCategory.id === 0 ? (
        <NoSearchContainer>
          <h1>VOCÊ AINDA NÃO REALIZOU UMA BUSCA</h1>
          <h3>Digite algum termo de pesquisa ou escolha uma categoria</h3>
        </NoSearchContainer>
      ) : (
        products?.map((product: any) => (
          <ProductCard
            key={product.id}
            name={product.title}
            price={product.price}
            photo={product.thumbnail}
          />
        ))
      )}
    </ListContainer>
  );
}

export default ProductsList;
