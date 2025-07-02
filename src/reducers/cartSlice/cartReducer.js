import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userInstance as userInstances } from "../../config/axios";
const userInstance = userInstances;

const initialState = {
  cartItems: [],
  cartTotalCost: 0,
  isLoading: {
    getCart: false,
  },
};

export const getUserCartItems = createAsyncThunk(
  "user/getUserCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userInstance().get("api/user/getUserCartItems");
      return {
        resultData: res.data,
      };
    } catch (err) {
      return rejectWithValue({
        msg: err.response.data.msg,
        code: err.response.data.code,
      });
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCartItems.pending, (state) => {
        state.isLoading.getCart = true;
      })
      .addCase(getUserCartItems.fulfilled, (state, action) => {
        state.isLoading.getCart = false;
        state.cartItems = action.payload.resultData.cartItems;
        state.cartTotalCost = action.payload.resultData.totalCartCost;
      })
      .addCase(getUserCartItems.rejected, (state) => {
        state.isLoading.getCart = false;
      });
  },
});

export default cartSlice.reducer;
