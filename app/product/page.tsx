import { Container, Heading } from "@radix-ui/themes";
import ProductList from "./_components/ProductList";

const ProductPage = () => {
  return (
    <Container>
      <Heading className="p-4" as="h3">
        Products List
      </Heading>
      <ProductList />
    </Container>
  );
};

export default ProductPage;
