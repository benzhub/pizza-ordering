import { Container } from "@radix-ui/themes";
import OrderItem from "./_components/OrderItem";

const OrderPage = () => {
  return (
    <Container className="px-8 font-bold">
      <OrderItem/>
    </Container>
  );
};

export default OrderPage;
