import { Container, Heading } from "@radix-ui/themes";
import ProductList from "./_components/ProductList";

const ProductPage = () => {
  return (
    <Container className="p-4">
      <Heading as="h3">
        Products List
      </Heading>
      <ProductList />
    </Container>
  );
};

export default ProductPage;
