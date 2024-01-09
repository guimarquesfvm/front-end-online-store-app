"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";

type CategoryItemType = {
  id: number;
  name: string;
}

interface StoreContextType {
  selectedCategory: CategoryItemType;
  setSelectedCategory: (category: CategoryItemType) => void;
  query: string;
  setQuery: (query: string) => void;
}

export const StoreContext = createContext<StoreContextType>({} as StoreContextType);

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryItemType>({name: "", id: 0});
  const [query, setQuery] = useState<string>("");

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider
        value={{
          selectedCategory,
          setSelectedCategory,
          query,
          setQuery,
        }}
      >
        {children}
      </StoreContext.Provider>
    </QueryClientProvider>
  );
};

export default StoreProvider;
