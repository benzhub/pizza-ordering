import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { CreatedOrderType } from "../page";

const postOrder = async (data: CreatedOrderType) => {
  try {
    const response = await axios.post("/api/orders/", data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create order");
  }
};

export function useCheckout() {
  const queryClient = useQueryClient();
  const {
    mutate: checkout,
    isPending: isCheckingout,
    isSuccess: isCheckoutSuccess,
  } = useMutation({
    mutationFn: (data: CreatedOrderType) => postOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Your Order is created successfully!");
    },
    onError: () => {
      toast.error("Failed to create order");
    },
  });

  return { isCheckingout, checkout, isCheckoutSuccess };
}
