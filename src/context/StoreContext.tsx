"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ProductType } from "@/types";
import { CategoryType } from "@/types/category-type";
import { ratingType } from "@/types/rating-type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface StoreContextType {
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
  query: string;
  setQuery: (query: string) => void;
  cartItems: ProductType[];
  setCartItems: Dispatch<SetStateAction<any>>;
  ratings: ratingType[];
  setRatings: Dispatch<SetStateAction<any>>;
  cartTotal: number;
  setCartTotal: Dispatch<SetStateAction<number>>;
}

export const StoreContext = createContext<StoreContextType>({} as StoreContextType);

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({name: "", id: 0});
  const [query, setQuery] = useState<string>("");
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);
  const [ratings, setRatings] = useLocalStorage("ratings", []);
  const [cartTotal, setCartTotal] = useState(0);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider
        value={{
          selectedCategory,
          setSelectedCategory,
          query,
          setQuery,
          cartItems,
          setCartItems,
          ratings,
          setRatings,
          cartTotal,
          setCartTotal
        }}
      >
        {children}
      </StoreContext.Provider>
    </QueryClientProvider>
  );
};

export default StoreProvider;
