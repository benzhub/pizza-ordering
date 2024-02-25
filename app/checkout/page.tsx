"use client";
import { Spinner, Skeleton } from "@/app/components";
import {
  clearCart,
  getCarts,
  getTotalCartPrice,
} from "@/lib/features/cart/cartsSlice";
import { fetchAddress } from "@/lib/features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Button, Container, Heading, TextField } from "@radix-ui/themes";
import { MouseEvent, useEffect, useState } from "react";
import CartEmpty from "../cart/_components/CartEmpty";
import { useCheckout } from "./_components/useCheckout";
import { formatIntl } from "@/utils/formatIntl";
import { SkeletonTheme } from "react-loading-skeleton";

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
  const cartItems = useAppSelector(getCarts).map((item) => ({
    productId: item.productId,
    unitPrice: item.unitPrice,
    quantity: item.quantity,
  }));
  const [formattedTotalPrice, setFormattedTotalPrice] = useState<string>("0");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isCheckingout, checkout, isCheckoutSuccess } = useCheckout();

  useEffect(() => {
    setFormattedTotalPrice(formatIntl(totalPrice));
    setCustomerAddress(address);
    setCustomerPhone(phone);
    setCustomerName(username);
    setIsLoading(false);
  }, [totalPrice, address, phone, username]);

  function handleGetPosition(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  async function handleCheckout(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    checkout({ cartItems, customerName, customerPhone, customerAddress });
    if (isCheckoutSuccess) dispatch(clearCart());
  }

  if (isLoading) {
    return <CheckoutSkeleton />;
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
                    disabled={isCheckingout}
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
                    disabled={isCheckingout}
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
                    disabled={isCheckingout}
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
                  disabled={isCheckingout}
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

const CheckoutSkeleton = () => {
  return (
    <Container>
      <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
        <Box className="p-4 lg:w-[60%] m-auto">
          <Skeleton height="2.5rem" width="18rem" />
          <Box className="flex flex-col gap-4 mt-4">
            <Box className="flex flex-col lg:flex-row gap-2 lg:gap-6">
              <Box className="w-[40%]">
                <Skeleton height="2.5rem" />
              </Box>
              <Box className="w-full">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
            </Box>
            <Box className="flex flex-col lg:flex-row gap-2 lg:gap-6">
              <Box className="w-[40%]">
                <Skeleton height="2.5rem" />
              </Box>
              <Box className="w-full">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
            </Box>
            <Box className="flex flex-col lg:flex-row gap-2 lg:gap-6">
              <Box className="w-[40%]">
                <Skeleton height="2.5rem" />
              </Box>
              <Box className="w-full">
                <Skeleton height="3rem" style={{ borderRadius: "50px" }} />
              </Box>
            </Box>
            <Box className="w-[250px] mt-4">
              <Skeleton height="4rem" style={{ borderRadius: "50px" }} />
            </Box>
          </Box>
        </Box>
      </SkeletonTheme>
    </Container>
  );
};

export default Checkout;
