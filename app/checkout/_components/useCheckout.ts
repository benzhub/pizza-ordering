import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CreatedOrderType {
  cartItems: CartItem[];
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}

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
