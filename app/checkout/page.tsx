"use client";
import { Skeleton, Spinner } from "@/app/components";
import {
  clearCart,
  getCarts,
  getTotalCartPrice,
} from "@/lib/features/cart/cartsSlice";
import { fetchAddress } from "@/lib/features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { formatIntl } from "@/utils/formatIntl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Heading, TextField } from "@radix-ui/themes";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import { z } from "zod";
import CartEmpty from "../cart/_components/CartEmpty";
import { orderSchema, phoneNumberRegex } from "../validationSchema";
import { useCheckout } from "./_components/useCheckout";
export type CreatedOrderType = z.infer<typeof orderSchema>;

export type CreatedOrderTypeWithoutCartItems = Omit<CreatedOrderType, 'cartItems'>;

const orderSchemaWithoutCartItems = orderSchema.omit({ cartItems: true });

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
    productId: Number(item.productId),
    unitPrice: item.unitPrice,
    quantity: item.quantity,
  }));
  const [formattedTotalPrice, setFormattedTotalPrice] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isCheckingout, checkout, isCheckoutSuccess } = useCheckout();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatedOrderTypeWithoutCartItems>({
    resolver: zodResolver(orderSchemaWithoutCartItems)
  });

  useEffect(() => {
    setFormattedTotalPrice(formatIntl(totalPrice));
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [totalPrice]);

  useEffect(() => {
    if(errors?.customerName?.message) toast.error(`Fist Name: ${errors?.customerName?.message}`)
    if(errors?.customerPhone?.message) toast.error(`Phone Number: ${errors?.customerPhone?.message}. Example: 0900123456`)
    if(errors?.customerAddress?.message) toast.error(`Address: ${errors?.customerAddress?.message}`)
    if (isCheckoutSuccess) dispatch(clearCart());
  }, [errors, isCheckoutSuccess, dispatch]);

  function handleGetPosition(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  const onSubmit = handleSubmit((data) => {
    checkout({...data, cartItems})
  });

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
            <form
              className="text-xl font-bold flex flex-col gap-4"
              onSubmit={onSubmit}
            >
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-[150px_400px] lg:gap-4">
                <label>First Name</label>
                <TextField.Root className="py-1 px-2">
                  <TextField.Input
                    placeholder="Your First Name"
                    size="3"
                    defaultValue={username}
                    {...register("customerName")}
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
                    defaultValue={phone}
                    {...register("customerPhone", {
                      pattern: phoneNumberRegex,
                    })}
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
                    defaultValue={address}
                    {...register("customerAddress")}
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
              <Button
                className="w-64"
                size="4"
                radius="full"
                disabled={isCheckingout}
              >
                Order Now From ${formattedTotalPrice}
              </Button>
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
