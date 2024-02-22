"use client";
import React from "react";
import ProductListSkeleton from "./ProductListSkeleton";
import { useProducts } from "./useProducts";
import { ProductItem } from "./ProductItem";
import { Pizza as PizzaProp } from "./PizzaType";

const ProductList = () => {
  const { pizzas, error, isLoading } = useProducts();

  if (isLoading) return <ProductListSkeleton />;
  if (error) return null;
  return (
    <ul className="divide-y-[1px] divide-stone-200/50 p-2">
      {pizzas?.map((pizza: PizzaProp) => (
        <ProductItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
};

export default ProductList;
