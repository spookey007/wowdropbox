import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { withoutAuth as withoutAuthInstance } from "../../config/axios";
const withoutAuth = withoutAuthInstance;

const initialState = {
  isLoading: false,
};

export const createFeedback = createAsyncThunk(
  "user/createFeedback",
  async (data, { rejectWithValue }) => {
    try {
      const res = await withoutAuth().post("/api/user/createFeedback", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return {
        resultData: res.data,
      };
    } catch (err) {
      return rejectWithValue({
        msg: err.response?.data?.msg || "Error submitting feedback",
        code: err.response?.data?.code || 500,
      });
    }
  }
);

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFeedback.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFeedback.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createFeedback.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default feedbackSlice.reducer;
