import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

const CartEmpty = () => {
  return (
    <div className="p-4">
      <div className="py-4">
        <Button>
          <Link href="/product" className="flex items-center gap-2">
            <IoArrowBack /> Back to Products List
          </Link>
        </Button>
      </div>
      <Text size="6" weight="bold">
        Your cart is still empty. Start adding some products :)
      </Text>
    </div>
  );
};

export default CartEmpty;
