import { combineReducers } from "redux";
import { cartReducer } from "./features/cart/cartsSlice";
import { userReducer } from "./features/user/usersSlice";

const rootReducer = combineReducers({
  user: userReducer,
  carts: cartReducer,
});

export default rootReducer;
