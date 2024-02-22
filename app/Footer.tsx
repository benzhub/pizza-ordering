"use client";
import {
  getTotalCartPrice,
  getTotalCartQuantity,
} from "@/lib/features/carts/cartsSlice";
import { useAppSelector } from "@/lib/hooks";
import { Button, Container, Flex } from "@radix-ui/themes";
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

  useEffect(() => {
    setQuantity(cartTotalQuantity);
    setPrice(cartTotalPrice);
  }, [cartTotalQuantity, cartTotalPrice]);

  return (
    <div className="bg-[var(--red-a10)] p-4">
      <Container>
        <Flex justify="between" align="center">
          <div className="flex gap-2 font-bold">
            <p>{quantity} PIZZAS</p>
            <p>${price}</p>
          </div>
          <Button size={{ initial: "3", lg: "4" }}>
            <Link
              href={currentPath === "/cart" ? "/checkout" : "/cart"}
              className="flex items-center gap-2"
            >
              {currentPath === "/cart" ? "Order Products" : "Open Cart"}{" "}
              <FaCircleArrowRight />
            </Link>
          </Button>
        </Flex>
      </Container>
    </div>
  );
};

export default Footer;
