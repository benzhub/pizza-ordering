import { Container, Heading } from "@radix-ui/themes";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ProductList from "./_components/ProductList";
import { getProducts } from "./_components/useProducts";

const ProductPage = async ({searchParams}: {searchParams: { page: string }}) => {
  const page = parseInt(searchParams.page) || 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [`pizzas?page=${page}`],
    queryFn: () => getProducts(page),
  });
  return (
    <Container className="p-4">
      <Heading as="h3">Products List</Heading>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList page={page} />
      </HydrationBoundary>
    </Container>
  );
};

export default ProductPage;
