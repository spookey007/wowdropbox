import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  //   userInstance as userInstances,
  gameInstance as gameInstances,
  withoutAuth as withoutAuthInstance,
} from "../../config/axios";
import { updateUserBoughtBoxes } from "../userSlice/userReducer";
// const userInstance = userInstances;
const withoutAuth = withoutAuthInstance;
const gameInstance = gameInstances;

const initialState = {
  boxFiltersData: [],
  boxList: [],
  boxCount: 0,
  unBoxCount: 0,
  boxDetails: {},
  boxProductList: [],
  winItemImage: "",
  winItem: {},
  isLoading: {
    boxFilter: false,
    boxLoader: false,
    boxDetailLoader: false,
    gameResultLoader: false,
  },
};

export const getBoxCategoryForFilter = createAsyncThunk(
  "user/getBoxCategoryForFilter",
  async (_, { rejectWithValue }) => {
    try {
      const res = await withoutAuth().get("/api/user/getBoxCategoryForFilter");
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

export const getBox = createAsyncThunk(
  "user/getBox",
  async (_, { rejectWithValue }) => {
    try {
      const res = await withoutAuth().get("/api/user/getBox");
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

export const getSingleBoxData = createAsyncThunk(
  "user/getBoxDetailById",
  async (data, { rejectWithValue }) => {
    try {
      const res = await withoutAuth().get(`api/user/getBoxDetailById/${data}`);
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

export const getGameResult = createAsyncThunk(
  "user/getGameResult",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await gameInstance().post("/api/game/getGameResult", data);
      if (res.data.code === 200) {
        const { userBoughtBox } = res.data;
        dispatch(updateUserBoughtBoxes(userBoughtBox));
      }
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

export const boxesSlice = createSlice({
  name: "box",
  initialState,
  reducers: {
    setWinItemImage: (state, { payload }) => {
      state.winItemImage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoxCategoryForFilter.pending, (state) => {
        state.isLoading.boxFilter = true;
      })
      .addCase(getBoxCategoryForFilter.fulfilled, (state, action) => {
        state.isLoading.boxFilter = false;
        state.boxFiltersData = action?.payload?.resultData?.data || [];
      })
      .addCase(getBoxCategoryForFilter.rejected, (state) => {
        state.isLoading.boxFilter = false;
      });

    builder
      .addCase(getBox.pending, (state) => {
        state.isLoading.boxLoader = true;
      })
      .addCase(getBox.fulfilled, (state, action) => {
        state.isLoading.boxLoader = false;
        state.boxList = action?.payload?.resultData?.box || [];
        state.boxCount = action?.payload?.resultData?.boxCount || 0;
        state.unBoxCount = action?.payload?.resultData?.unBoxCount || 0;
      })
      .addCase(getBox.rejected, (state) => {
        state.isLoading.boxLoader = false;
      });

    builder
      .addCase(getSingleBoxData.pending, (state) => {
        state.isLoading.boxDetailLoader = true;
      })
      .addCase(getSingleBoxData.fulfilled, (state, action) => {
        state.isLoading.boxDetailLoader = false;
        state.boxDetails = action?.payload?.resultData?.boxData || {};
        state.boxProductList =
          action?.payload?.resultData?.produtItemData || [];
      })
      .addCase(getSingleBoxData.rejected, (state) => {
        state.isLoading.boxDetailLoader = false;
      });

    builder
      .addCase(getGameResult.pending, (state) => {
        state.isLoading.gameResultLoader = true;
      })
      .addCase(getGameResult.fulfilled, (state, action) => {
        state.isLoading.gameResultLoader = false;
        state.winItem = action?.payload?.resultData?.data || {};
      })
      .addCase(getGameResult.rejected, (state) => {
        state.isLoading.gameResultLoader = false;
      });
  },
});

export const { setWinItemImage } = boxesSlice.actions;
export default boxesSlice.reducer;
