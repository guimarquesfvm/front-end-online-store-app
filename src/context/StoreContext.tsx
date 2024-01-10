"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CategoryType } from "@/types/category-type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";

interface StoreContextType {
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
  query: string;
  setQuery: (query: string) => void;
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any>>;
}

export const StoreContext = createContext<StoreContextType>({} as StoreContextType);

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({name: "", id: 0});
  const [query, setQuery] = useState<string>("");
  const [cartItems, setCartItems] = useLocalStorage("cart-items", []);

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
          setCartItems
        }}
      >
        {children}
      </StoreContext.Provider>
    </QueryClientProvider>
  );
};

export default StoreProvider;
