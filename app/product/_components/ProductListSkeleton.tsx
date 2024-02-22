import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const ProductListSkeleton = () => {
  return (
    <Box className="max-w-[85%] lg:w-full lg:max-w-full m-auto lg:m-0">
      <Skeleton height="4rem"/>
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
    </Box>
  );
};

export default ProductListSkeleton;
