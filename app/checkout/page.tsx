"use client";
import { getTotalCartPrice } from "@/lib/features/cart/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button, Container, Heading, TextField } from "@radix-ui/themes";
import { MouseEvent, useEffect, useState } from "react";
import CartEmpty from "../cart/_components/CartEmpty";
import { fetchAddress } from "@/lib/features/user/usersSlice";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useAppSelector((store) => store.user);
  const isLoadingAddress = addressStatus === "loading";
  const totalPrice = useAppSelector(getTotalCartPrice);
  const [formattedTotalPrice, setFormattedTotalPrice] = useState<string>("0");

  useEffect(() => {
    setFormattedTotalPrice(new Intl.NumberFormat("en-US").format(totalPrice));
  }, [totalPrice]);

  function handleGetPosition(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(fetchAddress());
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
                    defaultValue={username}
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
                    defaultValue={address}
                  />
                  {!position?.latitude && !position?.longitude && (
                    <Button
                      disabled={isLoadingAddress}
                      onClick={handleGetPosition}
                      radius="full"
                    >
                      {isLoadingAddress ? "Loading..." : "Get Position"}
                      {isLoadingAddress ? (
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                      ) : null}
                    </Button>
                  )}
                </TextField.Root>
              </div>
              <div className="mt-4">
                <Button size="4" radius="full">
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
