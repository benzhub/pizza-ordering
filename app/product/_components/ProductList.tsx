"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import ProductListSkeleton from "./ProductListSkeleton";
import Image from "next/image";
import { Heading } from "@radix-ui/themes";

interface Pizza {
  id: string;
  title: string;
  description: string;
  price: number;
  thumb: string;
}

const ProductList = () => {
  const {
    data: pizzas,
    error,
    isLoading,
  } = useQuery<Pizza[]>({
    queryKey: ["pizzas"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/pizzas`)
        .then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });
  if (isLoading) return <ProductListSkeleton />;
  if (error) return null;
  return (
    <ul className="p-2">
      {pizzas?.map((pizza: Pizza) => (
        <li
          key={pizza.id}
          className="flex items-center justify-start gap-4 p-2"
        >
          <Image className="rounded-md" src={pizza.thumb} alt={pizza.title} width={100} height={100} />
          <Heading as="h4">{pizza.title}</Heading>
          <span className="inline-block font-bold text-lg">
            $ {pizza.price}
          </span>
          <p>{pizza.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
