"use client";
import { Skeleton } from "@/app/components";
import {
  getTotalCartPrice,
  getTotalCartQuantity,
} from "@/lib/features/cart/cartsSlice";
import { useAppSelector } from "@/lib/hooks";
import { formatIntl } from "@/utils/formatIntl";
import { Button, Container, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { SkeletonTheme } from "react-loading-skeleton";

const Footer = () => {
  const currentPath = usePathname();
  const cartTotalQuantity = useAppSelector(getTotalCartQuantity);
  const cartTotalPrice = useAppSelector(getTotalCartPrice);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { status } = useSession();

  const linkUrl =
    quantity < 1 ? "/product" : currentPath === "/cart" ? "/checkout" : "/cart";

  const linkName =
    quantity < 1
      ? "Products List"
      : currentPath === "/cart"
      ? "Order Products"
      : "Open Cart";

  useEffect(() => {
    setQuantity(cartTotalQuantity);
    setPrice(cartTotalPrice);
  }, [cartTotalQuantity, cartTotalPrice]);

  if (status === "loading") return <NavSkeleton />;

  return (
    <Container className="bg-[var(--red-a10)] p-4">
      <Flex justify="between" align="center">
        <Flex gap="2" className="font-bold">
          <Text>{formatIntl(quantity)} PIZZAS</Text>
          <Text>${formatIntl(price)}</Text>
        </Flex>
        <Button size={{ initial: "3", lg: "4" }}>
          <Link href={linkUrl} className="flex items-center gap-2">
            {linkName}
            <FaCircleArrowRight />
          </Link>
        </Button>
      </Flex>
    </Container>
  );
};

const NavSkeleton = () => {
  return (
    <Container className="bg-[var(--red-a10)] p-4">
      <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
        <Flex justify="between" align="center">
          <Skeleton height="2.5rem" width="8rem" />
          <Skeleton height="3rem" width="9rem" />
        </Flex>
      </SkeletonTheme>
    </Container>
  );
};

export default Footer;
