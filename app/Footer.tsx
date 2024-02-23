"use client";
import { getTotalCartPrice, getTotalCartQuantity } from "@/lib/features/cart/cartsSlice";
import { useAppSelector } from "@/lib/hooks";
import { formatIntl } from "@/utils/formatIntl";
import { Button, Container, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";

const Footer = () => {
  const currentPath = usePathname();
  const cartTotalQuantity = useAppSelector(getTotalCartQuantity);
  const cartTotalPrice = useAppSelector(getTotalCartPrice);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const linkUrl = quantity < 1
    ? "/product" 
    : currentPath === "/cart" 
      ? "/checkout"
      : "/cart"
  
  const linkName = quantity < 1
  ? "Products List" 
  : currentPath === "/cart" 
    ? "Order Products"
    : "Open Cart"

  useEffect(() => {
    setQuantity(cartTotalQuantity);
    setPrice(cartTotalPrice);
  }, [cartTotalQuantity, cartTotalPrice]);

  return (
    <div className="bg-[var(--red-a10)] p-4">
      <Container>
        <Flex justify="between" align="center">
          <div className="flex gap-2 font-bold">
            <Text>{formatIntl(quantity)} PIZZAS</Text>
            <Text>${formatIntl(price)}</Text>
          </div>
          <Button size={{ initial: "3", lg: "4" }}>
            <Link
              href={linkUrl}
              className="flex items-center gap-2"
            >
              {linkName}
              <FaCircleArrowRight />
            </Link>
          </Button>
        </Flex>
      </Container>
    </div>
  );
};

export default Footer;
