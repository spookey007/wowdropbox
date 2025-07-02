import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { withoutAuth as withoutAuthInstance } from "../../config/axios";
import { socket } from "../../config/socket";
const withoutAuth = withoutAuthInstance;

const initialState = {
  liveDropsData: [],
  loading: false,
  liveDropCount: 0,
};

export const getLiveDrops = createAsyncThunk(
  "user/getLiveDrops",
  async (_, { rejectWithValue }) => {
    try {
      const res = await withoutAuth().get("api/user/getLiveDrops");
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

export const liveDropSlice = createSlice({
  name: "livedrop",
  initialState,
  reducers: {
    autoUpdateLiveDrops: (state, action) => {
      state.liveDropsData.unshift(action.payload);
      if (state.liveDropsData.length > 50) state.liveDropsData.pop();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLiveDrops.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLiveDrops.fulfilled, (state, action) => {
        state.liveDropsData = action.payload.resultData.data;
        state.liveDropCount = action.payload.resultData.count;
        state.loading = false;
      })
      .addCase(getLiveDrops.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { autoUpdateLiveDrops } = liveDropSlice.actions;

export const autoUpdate = () => (dispatch) => {
  socket.on("liveDrop.autoUpdate", (drop) => {
    dispatch(autoUpdateLiveDrops(drop));
  });
};

export default liveDropSlice.reducer;
