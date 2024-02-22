"use client";
import {
  CartItem as CartItemType,
  clearCart,
  getCarts,
} from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button, Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
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
      <div className="p-2">
        <Button>
          <Link href="/product" className="flex items-center gap-2">
            <IoArrowBack /> Back to Products List
          </Link>
        </Button>
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
