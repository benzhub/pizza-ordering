"use client";
import { Skeleton } from "@/app/components";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { SkeletonTheme } from "react-loading-skeleton";
import { type Pizza } from "./PizzaType";
import { ProductItem } from "./ProductItem";
import { useProducts } from "./useProducts";
import Pagination from "@/app/components/Pagination";
import PAGESIZE from "@/utils/pageSize";

const ProductList = ({ page }: { page: number }) => {
  const { pizzas = [], error, isLoading, totalCount } = useProducts(page);

  if (isLoading) return <ProductListSkeleton />;
  if (error) return null;
  return (
    <>
      <ul className="divide-y-[1px] divide-stone-200/50">
        {pizzas?.map((pizza: Pizza) => (
          <ProductItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
      <Box className="flex justify-center py-6">
        <Pagination
          itemCount={totalCount}
          pageSize={PAGESIZE}
          currentPage={page}
        />
      </Box>
    </>
  );
};

const ProductListSkeleton = () => {
  return (
    <Box className="w-full">
      <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
        <Flex direction="column" gap="6" className="mt-4">
          <ProductItemSkeleton />
          <ProductItemSkeleton />
          <ProductItemSkeleton />
          <ProductItemSkeleton />
          <ProductItemSkeleton />
        </Flex>
      </SkeletonTheme>
    </Box>
  );
};

const ProductItemSkeleton = () => {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 items-center">
      <Skeleton height="7rem" width="7rem" />
      <Grid columns="1" gap="3">
        <Skeleton height="1.5rem" />
        <Skeleton height="3rem" />
        <Box className="flex justify-between gap-2">
          <Box className="w-[20%] lg:w-[10%]">
            <Skeleton height="1.5rem" />
          </Box>
          <Box className="lg:h-[2rem] w-[30%] lg:w-[12%]">
            <Skeleton height="1.5rem" style={{ borderRadius: "50px" }} />
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default ProductList;
