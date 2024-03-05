import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type Pizza } from "./PizzaType";

interface Response {
  products: Pizza[];
  totalCount: number;
}

export async function getProducts(page: number) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/?page=${page}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    return { error };
  }
}

export const useProducts = (page: number) => {
  const { data, error, isLoading } = useQuery<Response>({
    queryKey: [`pizzas?page=${page}`],
    queryFn: () => getProducts(page),
  });
  const { products: pizzas, totalCount } = data || {
    products: [],
    totalCount: 0,
  };
  return { pizzas, totalCount, error, isLoading };
};
