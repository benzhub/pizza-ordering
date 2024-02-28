"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pizza } from "./PizzaType";

interface Props {
  products: Pizza[];
  totalCount: number;
}

export const useProducts = (page: number) => {
  const { data, error, isLoading } = useQuery<Props>({
    queryKey: [`pizzas?page=${page}`],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/?page=${page}`)
        .then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });
  const { products: pizzas, totalCount } = data || {
    products: [],
    totalCount: 0,
  };
  return { pizzas, totalCount, error, isLoading };
};
