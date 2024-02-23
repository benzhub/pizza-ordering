"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type Order, type OrderItem as OrderItemProps } from "@prisma/client";

export interface OrderProps extends Order {
  assignedOrderItem: OrderItemProps[];
}

export const useOrders = () => {
  const {
    data: orders, error, isLoading,
  } = useQuery<OrderProps[]>({
    queryKey: ["orders"],
    queryFn: () => axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/`)
      .then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });
  return { orders, error, isLoading };
};
