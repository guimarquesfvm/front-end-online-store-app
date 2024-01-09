"use client";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const getCategorites = async () => {
    const res = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    return res.json();
  }

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategorites(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    categories: data
  }
}