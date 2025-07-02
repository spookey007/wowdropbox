import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { withoutAuth as withoutAuthInstance } from "../../config/axios";
const withoutAuth = withoutAuthInstance;

const initialState = {
  isLoading: false,
  threeWinners: [],
  socialProofList: [],
};

export const getSocialProofData = createAsyncThunk(
  "user/getSocialProofData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await withoutAuth().get("api/user/getSocialProofData");
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

export const socialProofSlice = createSlice({
  name: "socialproof",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSocialProofData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSocialProofData.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action?.payload.resultData.data.winnersData;
        state.threeWinners = data.map((el, index) => ({
          rank: `${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : "rd"}`,
          date: el.createdAt,
          name: el?.username,
          prize: el?.productName,
          id: el?._id,
          avatar: el?.profile,
        }));
        state.socialProofList = action?.payload.resultData.data.socialProofData;
      })
      .addCase(getSocialProofData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default socialProofSlice.reducer;
