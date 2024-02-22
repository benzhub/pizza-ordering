import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  carts: CartItem[];
}

const initialState: CartState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = state.carts.find(
        (item) => item.productId === action.payload.productId
      );
      if (!item) {
        state.carts.push(action.payload);
      } else {
        item.quantity++;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.carts = state.carts.filter(
        (item) => item.productId !== action.payload
      );
    },
    increaseItemQuantity(state, action: PayloadAction<string>) {
      const item = state.carts.find(
        (item) => item.productId === action.payload
      );
      if (item) {
        item.quantity++;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    decreaseItemQuantity(state, action: PayloadAction<string>) {
      const item = state.carts.find(
        (item) => item.productId === action.payload
      );
      if (item) {
        item.quantity--;
        item.totalPrice = item.unitPrice * item.quantity;
        if (item.quantity === 0) {
          state.carts = state.carts.filter(
            (item) => item.productId !== action.payload
          );
        }
      }
    },
    clearCart(state) {
      state.carts = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const getCarts = (state: { carts: CartState }) => state.carts.carts;

export const getTotalCartPrice = (state: { carts: CartState }) => {
  return state.carts.carts.reduce((acc, cur) => acc + cur.totalPrice, 0);
};

export const getTotalCartQuantity = (state: { carts: CartState }) => {
  return state.carts.carts.reduce((acc, cur) => acc + cur.quantity, 0);
};

export const getCurrentQuantityById = (id: string) => (state: { carts: CartState }) => {
  return state.carts.carts.find((item) => item.productId === id)?.quantity ?? 0;
}
