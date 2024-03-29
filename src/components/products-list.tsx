"use client";
import { StoreContext } from "@/context/StoreContext";
import { useProducts } from "@/hooks/useProducts";
import React, { useContext } from "react";
import ProductCard from "./product-card";
import styled from "styled-components";
import { ProductType } from "@/types";

const ListContainer = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  flex-grow: 1;
  
  @media (min-width : ${({ theme }) => theme.desktopBreakpoint}) {
    gap: 28px;
  }
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

const IsLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 32px;
  color: var(--primary-button);
  font-weight: 700;
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
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
  const { products, isLoading } = useProducts(selectedCategory, query);
  
  return (
    <ListContainer>
      {(!isLoading && products?.length === 0 && query !== '') && (
        <NotFoundContainer>
          <h1>NENHUM PRODUTO FOI ENCONTRADO</h1>
          <h3>Digite outro termo de pesquisa ou escolha uma categoria</h3>
        </NotFoundContainer>
      )}
      {isLoading && <IsLoadingContainer>Carregando...</IsLoadingContainer>}
      {selectedCategory.id === 0 && query === "" ? (
        <NoSearchContainer>
          <h1>VOCÊ AINDA NÃO REALIZOU UMA BUSCA</h1>
          <h3>Digite algum termo de pesquisa ou escolha uma categoria</h3>
        </NoSearchContainer>
      ) : (
        products?.map((product: ProductType) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))
      )}
    </ListContainer>
  );
}

export default ProductsList;
