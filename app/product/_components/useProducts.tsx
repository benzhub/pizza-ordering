"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pizza } from "./PizzaType";

export const useProducts = () => {
  const {
    data: pizzas, error, isLoading,
  } = useQuery<Pizza[]>({
    queryKey: ["pizzas"],
    queryFn: () => axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`)
      .then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });
  return { pizzas, error, isLoading };
};
