"use client";
import StoreProvider, { StoreContext } from "@/context/StoreContext";
import { useCategories } from "@/hooks/useCategories";
import React, { useContext } from "react";
import styled from "styled-components";

type CategoryItem = {
  id: number;
  name: string;
};

const CategoryContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 310px;
  height: 662px;
  padding: 41px 36px;

  hr {
    background-color: var(--secondary-text);
  }
`;

const CategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;

  li {
    font-size: 16px;
    font-weight: 400;
    color: var(--category-text);
    cursor: pointer;
  }
`;

function CategoriesBar() {
  const { categories } = useCategories();
  const { setSelectedCategory } = useContext(StoreContext);

  return (
    <CategoryContainer>
      <h2>Categorias</h2>
      <hr />
      <CategoryList>
        {categories?.map((category: CategoryItem) => (
          <li
            key={category.id}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </li>
        ))}
      </CategoryList>
    </CategoryContainer>
  );
}

export default CategoriesBar;
