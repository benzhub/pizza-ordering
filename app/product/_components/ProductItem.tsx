"use client";
import React from "react";
import Image from "next/image";
import { Button, Flex, Heading } from "@radix-ui/themes";
import {
  addItem,
  getCurrentQuantityById
} from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Pizza } from "./PizzaType";

export const ProductItem = ({ pizza }: { pizza: Pizza; }) => {
  const { id, title, description, thumb, price } = pizza;
  const dispatch = useAppDispatch();
  const currentQuantity = useAppSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddItemtoCart() {
    const newItem = {
      productId: id,
      title,
      quantity: 1,
      unitPrice: price,
      totalPrice: price,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="grid grid-cols-[auto_1fr] items-center">
      <div className="lg:py-4">
        <Image
          className="rounded-md w-[100px] lg:w-[200px] h-auto"
          src={thumb}
          alt={title}
          width={100}
          height={100} />
      </div>
      <div className="p-2">
        <Heading as="h4" size={{ initial: "3", lg: "5" }}>
          {title}
        </Heading>
        <p className="text-sm capitalize italic text-stone-500 pt-1 pb-2">
          {description}
        </p>
        <Flex justify="between">
          <span className="inline-block font-bold text-lg">$ {price}</span>
          {!isInCart && (
            <Button
              radius="full"
              size={{ initial: "2", lg: "4" }}
              onClick={handleAddItemtoCart}
            >
              Add to Cart
            </Button>
          )}
        </Flex>
      </div>
    </li>
  );
};
