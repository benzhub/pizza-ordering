"use client";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "@/lib/features/carts/cartsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Button, Flex } from "@radix-ui/themes";

export const UpdateItemQuantity = ({
  productId,
  currentQuantity,
}: {
  productId: string;
  currentQuantity: number;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Flex align="center" gap="2">
      <Button
        variant="soft"
        color="indigo"
        radius="full"
        size={{ initial: "1", lg: "3" }}
        onClick={() => dispatch(decreaseItemQuantity(productId))}
      >
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button
        variant="soft"
        color="indigo"
        radius="full"
        size={{ initial: "1", lg: "3" }}
        onClick={() => dispatch(increaseItemQuantity(productId))}
      >
        +
      </Button>
    </Flex>
  );
};
