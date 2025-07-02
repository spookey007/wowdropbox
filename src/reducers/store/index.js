import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../commonSlice/commonReducer";
import authReducer from "../authSlice/authReducer";
import userReducer from "../userSlice/userReducer";
import boxReducer from "../boxesSlice/boxReducer";
import liveDropReducer from "../liveDropSlice/liveDropReducer";
import cartReducer from "../cartSlice/cartReducer";
import checkOutReducer from "../checkOutSlice/checkOutReducer";
import paymentReducer from "../paymentSlice/paymentReducer";
import feedbackReducer from "../feedBackSlice/feedbackReducer";
import socilProofReducer from "../socialProofSlice/socialProofReducer";
import orderReducer from "../orderSlice/orderReducer";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    user: userReducer,
    box: boxReducer,
    livedrop: liveDropReducer,
    cart: cartReducer,
    checkout: checkOutReducer,
    payment: paymentReducer,
    feedback: feedbackReducer,
    socialproof: socilProofReducer,
    order: orderReducer,
  },
});
