"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type Order, type OrderItem as OrderItemProps } from "@prisma/client";

export interface OrderProps extends Order {
  assignedOrderItem: OrderItemProps[];
}

interface Props {
  orders: OrderProps[];
  totalCount: number;
}

export const useOrders = (page: number) => {
  const {data, error, isLoading} = useQuery<Props>({
    queryKey: [`orders?page=${page}`],
    queryFn: () => axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/?page=${page}`)
      .then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });
  const { orders, totalCount } = data || {
    orders: [],
    totalCount: 0,
  };
  return { orders, totalCount, error, isLoading };
};
