"use client";
import { Spinner } from "@/app/components";
import {
  clearCart,
  getCarts,
  getTotalCartPrice,
} from "@/lib/features/cart/cartsSlice";
import {
  fetchAddress
} from "@/lib/features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button, Container, Heading, TextField } from "@radix-ui/themes";
import { MouseEvent, useEffect, useState } from "react";
import CartEmpty from "../cart/_components/CartEmpty";
import { useCheckout } from "./_components/useCheckout";
import { formatIntl } from "@/utils/formatIntl";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const {
    username,
    status: addressStatus,
    phone,
    address,
  } = useAppSelector((store) => store.user);
  const isLoadingAddress = addressStatus === "loading";
  const totalPrice = useAppSelector(getTotalCartPrice);
  const cartItems = useAppSelector(getCarts).map((item) => {
    return { productId: item.productId, unitPrice: item.unitPrice, quantity: item.quantity };
  });
  const [formattedTotalPrice, setFormattedTotalPrice] = useState<string>("0");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const { isPending, checkout } = useCheckout();

  useEffect(() => {
    setFormattedTotalPrice(formatIntl(totalPrice));
    setCustomerAddress(address);
    setCustomerPhone(phone);
    setCustomerName(username);
  }, [totalPrice, address, phone, username]);

  function handleGetPosition(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  async function handleCheckout(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    checkout({ cartItems, customerName, customerPhone, customerAddress });
    dispatch(clearCart());
  }

  return (
    <Container>
      {formattedTotalPrice === "0" && <CartEmpty />}
      <div className="p-4 lg:w-[60%] m-auto">
        {formattedTotalPrice !== "0" && (
          <>
            <Heading as="h3" className="py-4" align="left">
              Ready to order? Let&apos;s go
            </Heading>
            <form className="text-xl font-bold flex flex-col gap-2 lg:gap-4">
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-[150px_400px] lg:gap-4">
                <label>First Name</label>
                <TextField.Root className="py-1 px-2">
                  <TextField.Input
                    placeholder="Your First Name"
                    size="3"
                    defaultValue={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    radius="full"
                  />
                </TextField.Root>
              </div>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-[150px_400px] lg:gap-4">
                <label>Phone Number</label>
                <TextField.Root className="py-1 px-2">
                  <TextField.Input
                    radius="full"
                    size="3"
                    placeholder="Your Phone Number"
                    defaultValue={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </TextField.Root>
              </div>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-[150px_400px] lg:gap-4">
                <label>Address</label>
                <TextField.Root className="flex items-center py-1 px-2">
                  <TextField.Input
                    radius="full"
                    size="3"
                    placeholder="Your Address"
                    defaultValue={customerAddress}
                    onChange={(e) => {
                      setCustomerAddress(e.target.value);
                    }}
                  />
                  {!address && (
                    <Button
                      disabled={isLoadingAddress}
                      onClick={handleGetPosition}
                      radius="full"
                    >
                      {isLoadingAddress ? (
                        <>
                          <span>Loading...</span>
                          <Spinner />
                        </>
                      ) : (
                        <span>Get Position</span>
                      )}
                    </Button>
                  )}
                </TextField.Root>
              </div>
              <div className="mt-4">
                <Button
                  size="4"
                  radius="full"
                  onClick={handleCheckout}
                  disabled={isPending}
                >
                  Order Now From ${formattedTotalPrice}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </Container>
  );
};

export default Checkout;
