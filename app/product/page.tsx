"use client";
import { Box, Container, Heading } from "@radix-ui/themes";
import ProductList from "./_components/ProductList";
import Pagination from "./Pagination";
import { useProducts } from "./_components/useProducts";
import PAGESIZE from "@/utils/pageSize";

const ProductPage = ({ searchParams }: { searchParams: { page: string } }) => {
  const page = parseInt(searchParams.page) || 1;
  const { pizzas = [], totalCount, error, isLoading } = useProducts(page);

  return (
    <Container className="p-4">
      <Heading as="h3">Products List</Heading>
      <ProductList pizzas={pizzas} error={error} isLoading={isLoading} />
      <Box className="flex justify-center py-6">
        <Pagination
          itemCount={totalCount}
          pageSize={PAGESIZE}
          currentPage={page}
        />
      </Box>
    </Container>
  );
};

export default ProductPage;
