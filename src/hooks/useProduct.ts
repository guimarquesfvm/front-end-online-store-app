import { useQuery } from "@tanstack/react-query";

const useProduct = (id: string) => {
  const getProduct = async () => {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    return response.json();
  }

  const { data, isLoading } = useQuery ({
    queryKey: ['product', id],
    queryFn: () => getProduct(),
    staleTime: 1000 * 60 * 60,
  })

  return {
    data,
    isLoading
  }
}

export default useProduct;