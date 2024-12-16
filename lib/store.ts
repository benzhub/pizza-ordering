import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReucer";
import { CartItem, CartState } from "./features/cart/cartsSlice";
import { UserState } from "./features/user/usersSlice";

export interface RootState {
  user: UserState;
  carts: CartState;
}

export const makeStore = () => {
  let preloadedState = {};
  if (typeof window !== "undefined") {
    preloadedState = {
      carts: {
        carts: JSON.parse(localStorage.getItem("carts") || "[]") as CartItem[],
      },
      user: JSON.parse(localStorage.getItem("user") || "{}") as UserState,
    };
  }

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: true,
  });

  if (typeof window !== "undefined") {
    store.subscribe(() => {
      localStorage.setItem(
        "carts",
        JSON.stringify(store.getState().carts.carts)
      );
      localStorage.setItem("user", JSON.stringify(store.getState().user));
    });
  }

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
