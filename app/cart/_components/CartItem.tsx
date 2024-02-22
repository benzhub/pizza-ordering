import { CartItem as CartItemType } from "@/lib/features/carts/cartsSlice";
import { Flex } from "@radix-ui/themes";
import { DeleteItem } from "./DeleteItem";
import { UpdateItemQuantity } from "./UpdateItemQuantity";

export const CartItem = ({ item }: { item: CartItemType }) => {
  return (
    <li className="flex flex-col gap-2 lg:flex-row lg:justify-between font-bold py-2 text-lg">
      <span className="block">
        {item.quantity} &times; {item.title}
      </span>
      <Flex align="center" justify="between" gap={{ initial: "3", lg: "5" }}>
        <span className="block">${item.totalPrice}</span>
        <UpdateItemQuantity
          productId={item.productId}
          currentQuantity={item.quantity}
        />
        <DeleteItem productId={item.productId} />
      </Flex>
    </li>
  );
};
