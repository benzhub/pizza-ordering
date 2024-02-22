"use client";
import { deleteItem } from "@/lib/features/cart/cartsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Button } from "@radix-ui/themes";

export const DeleteItem = ({ productId }: { productId: string }) => {
  const dispatch = useAppDispatch();
  function handleDeleteItem() {
    dispatch(deleteItem(productId));
  }
  return (
    <Button
      variant="outline"
      color="crimson"
      radius="full"
      size={{ initial: "2", lg: "4" }}
      onClick={handleDeleteItem}
    >
      Delete
    </Button>
  );
};
