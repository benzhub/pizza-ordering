"use client";
import {
  CartItem as CartItemType,
  clearCart,
  getCarts,
} from "@/lib/features/cart/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button, Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartEmpty from "./_components/CartEmpty";
import { CartItem } from "./_components/CartItem";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const carts = useAppSelector(getCarts);

  useEffect(() => {
    setCartItems(carts);
  }, [carts]);

  function handleClearCart() {
    dispatch(clearCart());
  }
  return (
    <Container>
      {cartItems.length === 0 && <CartEmpty />}
      <div className="p-4">
        <ul className="divide-y-[1px] divide-stone-200">
          {cartItems?.map((item: CartItemType) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </ul>
        {cartItems.length > 0 && (
          <Flex gap="4">
            <Button
              color="cyan"
              variant="solid"
              radius="full"
              size={{ initial: "2", lg: "4" }}
            >
              <Link href="/checkout">Order Products</Link>
            </Button>
            <Button
              color="orange"
              variant="soft"
              radius="full"
              size={{ initial: "2", lg: "4" }}
              onClick={handleClearCart}
            >
              Clear cart
            </Button>
          </Flex>
        )}
      </div>
    </Container>
  );
};

export default CartPage;
