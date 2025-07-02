// reducers/checkOutSlice/checkOutReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userInstance as userInstances } from "../../config/axios";
const userInstance = userInstances;

const initialState = {
  isLoading: {
    createPayment: false,
    savePayment: false,
    getPaymentHistory: false,
    savedCards: false,
    deleteCard: false,
  },

  paymentHistory: [],
  paymentPageDetails: {
    page: 1,
    totalPages: 1,
    limit: 5,
    search: "",
    status: "",
    sort: "",
  },
  savedCards: [],
};

export const createStripePayment = createAsyncThunk(
  "user/createStripePayment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userInstance().post(
        "/api/user/createStripePayment",
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

export const savePaymentData = createAsyncThunk(
  "user/savePaymentData",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userInstance().post("/api/user/savePaymentData", data);
      return { resultData: res.data };
    } catch (err) {
      return rejectWithValue({
        msg: err.response.data.msg,
        code: err.response.data.code,
      });
    }
  }
);

export const getPaymentHistory = createAsyncThunk(
  "user/getUserPaymentHistory",
  async (params, { rejectWithValue }) => {
    try {
      const res = await userInstance().get("/api/user/getUserPaymentHistory", {
        params,
      });
      return { resultData: res.data, pageParams: params };
    } catch (err) {
      return rejectWithValue({
        msg: err.response.data.msg,
        code: err.response.data.code,
      });
    }
  }
);

export const getUserSavedCards = createAsyncThunk(
  "user/getUserSavedCards",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userInstance().get("/api/user/getUserSavedCards");
      return { resultData: res.data };
    } catch (err) {
      return rejectWithValue({
        msg: err.response.data.msg,
        code: err.response.data.code,
      });
    }
  }
);

export const chargeSavedCard = createAsyncThunk(
  "user/chargeSavedCard",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userInstance().post("/api/user/chargeSavedCard", data);
      return { resultData: res.data };
    } catch (err) {
      return rejectWithValue({
        msg: err.response.data.msg,
        code: err.response.data.code,
      });
    }
  }
);

export const deleteUserSavedCards = createAsyncThunk(
  "user/deleteUserSavedCards",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userInstance().post(
        `/api/user/deleteUserSavedCards`,
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

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updatePaymentPageDetails: (state, action) => {
      state.paymentPageDetails = {
        ...state.paymentPageDetails,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStripePayment.pending, (state) => {
        state.isLoading.createPayment = true;
      })
      .addCase(createStripePayment.fulfilled, (state) => {
        state.isLoading.createPayment = false;
      })
      .addCase(createStripePayment.rejected, (state) => {
        state.isLoading.createPayment = false;
      });

    builder
      .addCase(savePaymentData.pending, (state) => {
        state.isLoading.savePayment = true;
      })
      .addCase(savePaymentData.fulfilled, (state) => {
        state.isLoading.savePayment = false;
      })
      .addCase(savePaymentData.rejected, (state) => {
        state.isLoading.savePayment = false;
      });

    builder
      .addCase(getPaymentHistory.pending, (state) => {
        state.isLoading.getPaymentHistory = true;
      })
      .addCase(getPaymentHistory.fulfilled, (state, action) => {
        state.isLoading.getPaymentHistory = false;

        const { resultData } = action.payload;
        const data = resultData?.data;
        state.paymentHistory =
          data?.payments?.map((item) => ({
            date: item?.createdAt,
            amount: item?.amount,
            status: item?.status,
            currency: item?.currency,
            _id: item?._id,
            boxname: item?.boxId?.name,
          })) || [];

        state.paymentPageDetails.page = data?.page || 1;
        state.paymentPageDetails.totalPages = data?.totalPages || 1;
      })
      .addCase(getPaymentHistory.rejected, (state) => {
        state.isLoading.getPaymentHistory = false;
      });

    builder
      .addCase(getUserSavedCards.pending, (state) => {
        state.isLoading.savedCards = true;
      })
      .addCase(getUserSavedCards.fulfilled, (state, action) => {
        state.isLoading.savedCards = false;
        state.savedCards = action?.payload?.resultData?.data || [];
      })
      .addCase(getUserSavedCards.rejected, (state) => {
        state.isLoading.savedCards = false;
      });

    builder.addCase(deleteUserSavedCards.pending, (state) => {
      state.isLoading.deleteCard = true;
    });
    builder.addCase(deleteUserSavedCards.fulfilled, (state) => {
      state.isLoading.deleteCard = false;
    });
    builder.addCase(deleteUserSavedCards.rejected, (state) => {
      state.isLoading.deleteCard = false;
    });
  },
});

export const { updatePaymentPageDetails } = paymentSlice.actions;
export default paymentSlice.reducer;
