"use client"
import { formatDateString } from "@/utils/formatDateString";
import { type Order, type OrderItem as OrderItemProps } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { useOrders } from "./useOrders";
import { type OrderProps } from "./useOrders";

const OrderItem = () => {
  const { orders, error, isLoading } = useOrders();
  return (
    <>
      {/* Mobile */}
      <ul className="grid grid-cols-1 gap-8 mb-12 lg:hidden">
        {orders?.map((order) => {
          const totalPrice = order.assignedOrderItem.reduce(
            (acc: number, val: OrderItemProps) =>
              val.unitPrice * val.quantity + acc,
            0
          );
          return <Mobile key={order.id} order={order} />;
        })}
      </ul>

      {/* Desktop */}
      <Table.Root variant="surface" className="hidden lg:block">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                {column.label}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders?.map((order) => {
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
        <li>Customer: {order.customerName}</li>
        <li>Phone: {order.customerPhone}</li>
        <li className="italic text-stone-500 text-ellipsis overflow-hidden whitespace-nowrap">
          Address: {order.customerAddress}
        </li>
        <li>Created: {formatDateString(order.createdAt)}</li>
        <div className="flex justify-between items-center border-t-2 border-white py-2">
          <li>Status: {order.status}</li>
          <li>
            Price: <span className="text-red-500">${totalPrice}</span>
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
    <Table.Row key={order.id}>
      <Table.Cell>{order.id}</Table.Cell>
      <Table.Cell className="text-red-500">$ {totalPrice}</Table.Cell>
      <Table.Cell>{order.customerName}</Table.Cell>
      <Table.Cell>{order.customerPhone}</Table.Cell>
      <Table.Cell>{order.customerAddress}</Table.Cell>
      <Table.Cell>{formatDateString(order.createdAt)}</Table.Cell>
      <Table.Cell>{order.status}</Table.Cell>
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
export const columnNames = columns.map((column) => column.value);

export const dynamic = "force-dynamic";

export default OrderItem;