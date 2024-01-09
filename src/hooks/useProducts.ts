import { CategoryType } from "@/types/category-type";
import { useQuery } from "@tanstack/react-query";


export const useProducts = (selectedCategory: CategoryType, query: string) => {

  const getProducts = async () => {
    const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${selectedCategory.id}&q=${query}`);
    const data = await result.json();
    return data;
  }

  const { data } = useQuery({
    queryKey: ['products', selectedCategory, query],
    queryFn: () => getProducts(),
    staleTime: 1000 * 60 * 60 * 24,
  })

  return {
    products: data?.results,
  }
}