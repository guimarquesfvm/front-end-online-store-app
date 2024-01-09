"use client";
import { StoreContext } from '@/context/StoreContext';
import { useProducts } from '@/hooks/useProducts'
import React, { useContext } from 'react'

function ProductsList() {
  const { query, selectedCategory } = useContext(StoreContext);

  const { products } = useProducts(selectedCategory, query);
  console.log(products);
  return (
    <ul>
      {products?.map((product: any) => (
        <li key={product.id}>
          <h3>{product.title}</h3>
          <img src={product.thumbnail} alt="product photo" />
        </li>
      ))}
    </ul>
  )
}

export default ProductsList