"use client";
import CategoriesBar from "@/components/categories-bar";
import ProductsList from "@/components/products-list";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  gap: 28px;
`
export default function Home() {
  return (
    <HomeContainer>
      <CategoriesBar />
      <ProductsList />
    </HomeContainer>
  )
}
