import { formatDateString } from "@/utils/formatDateString";
import {
  Status,
  type Order,
  type OrderItem as OrderItemProps,
} from "@prisma/client";
import { Box, Flex, Heading, Table } from "@radix-ui/themes";
import { type OrderProps } from "./useOrders";
import { formatIntl } from "@/utils/formatIntl";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Skeleton } from "@/app/components";
import { SkeletonTheme } from "react-loading-skeleton";

interface Props {
  orders: OrderProps[];
  error: Error | null;
  isLoading: boolean;
}

const OrderList = ({ orders, error, isLoading }: Props) => {  
  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  if (isLoading) return <OrderListSkeleton />;
  return (
    <>
      <Heading as="h3" className="py-4">
        Your Orders
      </Heading>
      {/* Mobile */}
      <ul className="grid grid-cols-1 gap-8 mb-12 lg:hidden">
        {orders?.toReversed().map((order) => <Mobile key={order.id} order={order} />)}
      </ul>

      {/* Desktop */}
      <Table.Root variant="surface" className="hidden lg:block">
        <Table.Header className="text-lg">
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                {column.label}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders?.toReversed().map((order) => {
            return <Desktop key={order.id} order={order} />;
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

const Mobile = ({ order }: { order: OrderProps }) => {
  const totalPrice = order.assignedOrderItem.reduce(
    (acc: number, val: OrderItemProps) => val.unitPrice * val.quantity + acc,
    0
  );
  return (
    <li
      key={order.id}
      className="p-2 border-2 border-gray-200 rounded-lg shadow-[5px_5px_0px_0px_#ff6847eb]"
    >
      <ul className="grid grid-cols-1 gap-2">
        <li className="border-b-2 border-white py-2 text-xl">ID: {order.id}</li>
        <li>
          Customer: <span className="text-xl italic">{order.customerName}</span>
        </li>
        <li>Phone: {order.customerPhone}</li>
        <li className="italic text-stone-500 text-ellipsis overflow-hidden whitespace-nowrap">
          Address: {order.customerAddress}
        </li>
        <li>Created: {formatDateString(order.createdAt)}</li>
        <div className="flex justify-between items-center border-t-2 border-white py-2">
          <li className={statuses[order.status].className}>
            {statuses[order.status].label}
          </li>
          <li>
            Price:{" "}
            <span className="text-red-500">${formatIntl(totalPrice)}</span>
          </li>
        </div>
      </ul>
    </li>
  );
};

const Desktop = ({ order }: { order: OrderProps }) => {
  const totalPrice = order.assignedOrderItem.reduce(
    (acc: number, val: OrderItemProps) => val.unitPrice * val.quantity + acc,
    0
  );
  return (
    <Table.Row key={order.id} align="center" className="text-lg">
      <Table.Cell>{order.id}</Table.Cell>
      <Table.Cell className="text-red-500">
        $ {formatIntl(totalPrice)}
      </Table.Cell>
      <Table.Cell>{order.customerName}</Table.Cell>
      <Table.Cell>{order.customerPhone}</Table.Cell>
      <Table.Cell>{order.customerAddress}</Table.Cell>
      <Table.Cell>{formatDateString(order.createdAt)}</Table.Cell>
      <Table.Cell className={statuses[order.status].className}>
        {statuses[order.status].label}
      </Table.Cell>
    </Table.Row>
  );
};

interface OrderColumn extends Order {
  totalPrice: number;
}

const columns: { label: string; value: keyof OrderColumn }[] = [
  { label: "Id", value: "id" },
  { label: "TotalPrice", value: "totalPrice" },
  { label: "Customer Name", value: "customerName" },
  { label: "Phone", value: "customerPhone" },
  { label: "Address", value: "customerAddress" },
  { label: "Created", value: "createdAt" },
  { label: "Status", value: "status" },
];

const statuses: { [key in Status]: { label: string; className: string } } = {
  OPEN: { label: "Open", className: "text-blue-500" },
  PENDING: { label: "Pending", className: "text-emerald-500" },
  CLOSE: { label: "Close", className: "text-orange-500" },
  CANCEL: { label: "Cancel", className: "text-rose-500" },
};

const OrderListSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
      <Skeleton height="2rem" width="8rem" />
      <Box className="lg:hidden">
        <Flex direction="column" className="mt-6" gap="6">
          {Array.from({ length: 5 }).map((_, index) => (
            <Box
              key={index}
              className="p-2 border-2 border-gray-200 rounded-lg shadow-[5px_5px_0px_0px_#ff6847eb]"
            >
              <Skeleton width="15rem" height="1.5rem" />
              <hr className="text-white my-2 border-[1px]" />
              <Flex direction="column" gap="3">
                <Skeleton width="15rem" height="1.5rem" />
                <Skeleton width="25rem" height="1.5rem" />
                <Skeleton width="15rem" height="1.5rem" />
              </Flex>
              <hr className="text-white my-2 border-[1px]" />
              <Flex justify="between">
                <Box className="w-[15%]">
                  <Skeleton height="1.5rem" />
                </Box>
                <Box className="w-[15%]">
                  <Skeleton height="1.5rem" />
                </Box>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
      <Table.Root variant="surface" className="hidden lg:block mt-6">
        <Table.Header className="text-lg">
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                {column.label}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Array.from({ length: 5 }).map((_, index) => (
            <Table.Row key={index} align="center" className="text-lg">
              {Array.from({ length: 7 }).map((_, idx) => (
                <Table.Cell key={idx}>
                  <Skeleton height="1.5rem" width="3rem" />
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </SkeletonTheme>
  );
};

export const columnNames = columns.map((column) => column.value);

export const dynamic = "force-dynamic";

export default OrderList;
