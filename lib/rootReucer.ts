import { combineReducers } from "redux";
import { cartReducer } from "./features/carts/cartsSlice";

const rootReducer = combineReducers({
  carts: cartReducer,
});

export default rootReducer;
