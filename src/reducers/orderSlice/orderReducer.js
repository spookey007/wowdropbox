// reducers/checkOutSlice/checkOutReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userInstance as userInstances } from "../../config/axios";
const userInstance = userInstances;

const initialState = {
  isLoading: {
    cancelOrder: false,
    returnOrder: false,
  },
};

export const orderCancelByUser = createAsyncThunk(
  "user/orderCancelByUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userInstance().post(
        "/api/user/orderCancelByUser",
        data
      );
      return { resultData: res.data };
    } catch (err) {
      return rejectWithValue({
        msg: err.response.data.msg,
        code: err.response.data.code || 500,
      });
    }
  }
);

export const createOrderReturnRequest = createAsyncThunk(
  "user/createOrderReturnRequest",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userInstance().post(
        "/api/user/createOrderReturnRequest",
        data
      );
      return { resultData: res.data };
    } catch (err) {
      return rejectWithValue({
        msg: err.response.data.msg,
        code: err.response.data.code,
      });
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderCancelByUser.pending, (state) => {
        state.isLoading.cancelOrder = true;
      })
      .addCase(orderCancelByUser.fulfilled, (state) => {
        state.isLoading.cancelOrder = false;
      })
      .addCase(orderCancelByUser.rejected, (state) => {
        state.isLoading.cancelOrder = false;
      });

    builder
      .addCase(createOrderReturnRequest.pending, (state) => {
        state.isLoading.returnOrder = true;
      })
      .addCase(createOrderReturnRequest.fulfilled, (state) => {
        state.isLoading.returnOrder = false;
      })
      .addCase(createOrderReturnRequest.rejected, (state) => {
        state.isLoading.returnOrder = false;
      });
  },
});

export default orderSlice.reducer;
