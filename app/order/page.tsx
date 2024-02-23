import { Container, Heading } from "@radix-ui/themes";
import OrderItem from "./_components/OrderItem";

const OrderPage = () => {
  return (
    <Container className="px-8 font-bold">
      <Heading as="h3" className="py-4">
        Your Orders
      </Heading>
      <OrderItem/>
    </Container>
  );
};

export default OrderPage;
