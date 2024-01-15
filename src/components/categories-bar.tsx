"use client";
import { StoreContext } from "@/context/StoreContext";
import { useCategories } from "@/hooks/useCategories";
import { CategoryType } from "@/types/category-type";
import React, { useContext } from "react";
import styled from "styled-components";

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

    &:hover {
      font-weight: 600;
    }
  }

  .selected-category {
    &:hover {
      font-weight: 800;
    }
    font-weight: 800;
    color: var(--primary-button);
  }
`;

function CategoriesBar() {
  const { categories } = useCategories();
  const { setSelectedCategory, selectedCategory } = useContext(StoreContext);

  return (
    <CategoryContainer>
      <h2>Categorias</h2>
      <hr />
      <CategoryList>
        {categories?.map((category: CategoryType) => (
          <li
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory?.id === category.id ? "selected-category" : ""}
          >
            {category.name}
          </li>
        ))}
      </CategoryList>
    </CategoryContainer>
  );
}

export default CategoriesBar;
