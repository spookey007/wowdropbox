// reducers/checkOutSlice/checkOutReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userInstance as userInstances } from "../../config/axios";
const userInstance = userInstances;

const initialState = {
  isLoading: {
    placeOrder: false,
    allOrders: false,
    singleOrder: false,
  },
  ordersList: [],
  singleOrderDetails: {},
  boxPrice: 0,
  pageDetails: {
    page: 1,
    totalPages: 1,
    limit: 5,
    search: "",
    status: "",
    sort: "",
  },
};

export const userPlaceOrder = createAsyncThunk(
  "user/userPlaceOrder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userInstance().post("/api/user/userPlaceOrder", data);
      return { resultData: res.data };
    } catch (err) {
      return rejectWithValue({
        msg: err.response.data.msg,
        code: err.response.data.code,
      });
    }
  }
);

export const fetchOrdersList = createAsyncThunk(
  "api/getAllOrders",
  async (params, { rejectWithValue }) => {
    try {
      const res = await userInstance().get("/api/user/getAllOrders", {
        params,
      });
      return {
        resultData: res.data,
        pageParams: params,
      };
    } catch (err) {
      return rejectWithValue({
        msg: err.response.data.msg,
        code: err.response.data.code,
      });
    }
  }
);

export const getSingleOrder = createAsyncThunk(
  "api/getSingleOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await userInstance().get(
        `/api/user/getSingleOrderDetails/${id}`
      );
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

export const checkOutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updatePageDetails: (state, action) => {
      state.pageDetails = { ...state.pageDetails, ...action.payload };
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      state.ordersList.forEach((order) => {
        if (order._id === orderId) {
          order.status = status;
        }
      });
    },
    updateOrderStatusByReturnRequest: (state, action) => {
      const { orderId, status } = action.payload;
      state.ordersList.forEach((order) => {
        if (order._id === orderId) {
          order.status = status;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userPlaceOrder.pending, (state) => {
        state.isLoading.placeOrder = true;
      })
      .addCase(userPlaceOrder.fulfilled, (state) => {
        state.isLoading.placeOrder = false;
      })
      .addCase(userPlaceOrder.rejected, (state) => {
        state.isLoading.placeOrder = false;
      });

    builder
      .addCase(fetchOrdersList.pending, (state) => {
        state.isLoading.allOrders = true;
      })
      .addCase(fetchOrdersList.fulfilled, (state, action) => {
        state.isLoading.allOrders = false;
        const { resultData } = action.payload;
        const data = resultData?.data;
        state.ordersList =
          data?.orders?.map((item) => ({
            id: item?.orderId?.orderid,
            date: item?.createdAt,
            items: item?.productId?.name,
            amount: item?.price,
            status: item?.status,
            quantity: item?.quantity,
            _id: item?._id,
          })) || [];
        state.pageDetails.page = data?.page || 1;
        state.pageDetails.totalPages = data?.totalPages || 1;
      })
      .addCase(fetchOrdersList.rejected, (state) => {
        state.isLoading.allOrders = false;
      });

    builder
      .addCase(getSingleOrder.pending, (state) => {
        state.isLoading.singleOrder = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.isLoading.singleOrder = false;
        state.singleOrderDetails =
          action?.payload?.resultData?.data?.orderDetailsData[0] || {};
        state.boxPrice = action?.payload?.resultData?.data?.totalBoxPrice || 0;
      })
      .addCase(getSingleOrder.rejected, (state) => {
        state.isLoading.singleOrder = false;
      });
  },
});

export const {
  updatePageDetails,
  updateOrderStatus,
  updateOrderStatusByReturnRequest,
} = checkOutSlice.actions;
export default checkOutSlice.reducer;
