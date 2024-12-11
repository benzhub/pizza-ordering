"use client";
import { Skeleton } from "@/app/components";
import {
  CartItem as CartItemType,
  clearCart,
  getCarts,
} from "@/lib/features/cart/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Button, Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartEmpty from "./_components/CartEmpty";
import { CartItem } from "./_components/CartItem";
import { SkeletonTheme } from "react-loading-skeleton";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const carts = useAppSelector(getCarts);

  useEffect(() => {
    setCartItems(carts);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [carts]);

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (isLoading) {
    return <CartPageSkeleton />;
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

const CartPageSkeleton = () => {
  return (
    <Container className="p-4">
      <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
        <Box className="flex flex-col gap-2 divide-y divide-solid">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4 py-2">
            <Box className="w-[50%] lg:w-[25%]">
              <Skeleton height="3rem" />
            </Box>
            <Box className="flex items-center justify-between w-full lg:w-[25%]">
              <Box className="w-[25%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
              <Box className="w-[25%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
              <Box className="w-[25%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
            </Box>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4 py-2">
            <Box className="w-[50%] lg:w-[25%]">
              <Skeleton height="3rem" />
            </Box>
            <Box className="flex items-center justify-between w-full lg:w-[25%]">
              <Box className="w-[25%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
              <Box className="w-[25%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
              <Box className="w-[25%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
            </Box>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4 py-2">
            <Box className="w-[50%] lg:w-[25%]">
              <Skeleton height="3rem" />
            </Box>
            <Box className="flex items-center justify-between w-full lg:w-[25%]">
              <Box className="w-[25%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
              <Box className="w-[25%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
              <Box className="w-[25%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
            </Box>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4 py-2">
            <Box className="w-[50%] lg:w-[25%]">
              <Skeleton height="3rem" />
            </Box>
            <Box className="flex items-center justify-between w-full lg:w-[25%]">
              <Box className="w-[25%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
              <Box className="w-[25%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
              <Box className="w-[25%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
            </Box>
          </div>
          <Box className="py-2">
            <Flex justify="start" gap="4">
              <Box className="w-[25%] lg:w-[20%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
              <Box className="w-[25%] lg:w-[20%]">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
            </Flex>
          </Box>
        </Box>
      </SkeletonTheme>
    </Container>
  );
};

export default CartPage;
