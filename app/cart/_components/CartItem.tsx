import { CartItem as CartItemType } from "@/lib/features/cart/cartsSlice";
import { Flex, Text } from "@radix-ui/themes";
import { DeleteItem } from "./DeleteItem";
import { UpdateItemQuantity } from "./UpdateItemQuantity";
import { formatIntl } from "@/utils/formatIntl";

export const CartItem = ({ item }: { item: CartItemType }) => {
  return (
    <li className="flex flex-col gap-2 lg:flex-row lg:justify-between font-bold py-2 text-lg">
      <Text>
        {formatIntl(item.quantity)} &times; {item.title}
      </Text>
      <Flex align="center" justify="between" gap={{ initial: "3", lg: "5" }}>
        <Text>${formatIntl(item.totalPrice)}</Text>
        <UpdateItemQuantity
          productId={item.productId}
          currentQuantity={item.quantity}
        />
        <DeleteItem productId={item.productId} />
      </Flex>
    </li>
  );
};
