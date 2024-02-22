"use client";
import React from "react";
import Image from "next/image";
import { Button, Flex, Heading } from "@radix-ui/themes";
import {
  addItem,
  getCurrentQuantityById,
} from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Pizza } from "./PizzaType";
import { UpdateItemQuantity } from "@/app/cart/_components/UpdateItemQuantity";
import { DeleteItem } from "@/app/cart/_components/DeleteItem";

export const ProductItem = ({ pizza }: { pizza: Pizza }) => {
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
          height={100}
        />
      </div>
      <div className="p-2">
        <Heading as="h4" size={{ initial: "3", lg: "5" }}>
          {title}
        </Heading>
        <p className="text-sm capitalize italic text-stone-500 pt-1 pb-2">
          {description}
        </p>
        <Flex justify="between" align="center">
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
          {isInCart && (
            <div className="flex gap-3 lg:gap-5">
              <UpdateItemQuantity productId={id} currentQuantity={currentQuantity} />
              <DeleteItem productId={id} />
            </div>
          )}
        </Flex>
      </div>
    </li>
  );
};
