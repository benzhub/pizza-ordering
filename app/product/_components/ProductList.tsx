"use client";
import { Pizza as PizzaProp } from "./PizzaType";
import { ProductItem } from "./ProductItem";
import ProductListSkeleton from "./ProductListSkeleton";
import { useProducts } from "./useProducts";

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
