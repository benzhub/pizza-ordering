"use client";
import { Box, Container } from "@radix-ui/themes";
import OrderList from "./_components/OrderList";
import { useOrders } from "./_components/useOrders";
import Pagination from "../components/Pagination";
import PAGESIZE from "@/utils/pageSize";

const OrderPage = ({ searchParams }: { searchParams: { page: string } }) => {
  const page = parseInt(searchParams.page) || 1;
  const { orders=[], totalCount, error, isLoading } = useOrders(page);
  return (
    <Container className="px-8 font-bold">
      <OrderList orders={orders} error={error} isLoading={isLoading}/>
      <Box className="flex justify-center my-6">
        <Pagination itemCount={totalCount} pageSize={PAGESIZE} currentPage={page}/>
      </Box>
    </Container>
  );
};

export default OrderPage;
