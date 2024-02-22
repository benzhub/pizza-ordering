import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReucer";
import { CartItem, CartState } from "./features/carts/cartsSlice";

export interface RootState {
  carts: CartState;
}

export const makeStore = () => {
  let preloadedState = {};
  if (typeof window !== "undefined") {
    preloadedState = {
      carts: {
        carts: JSON.parse(localStorage.getItem("carts") || "[]") as CartItem[],
      },
    };
  }

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  if (typeof window !== "undefined") {
    store.subscribe(() => {
      localStorage.setItem(
        "carts",
        JSON.stringify(store.getState().carts.carts)
      );
    });
  }

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
