import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  // gameInstance as gameInstances,
  // userInstance as userInstances,
  withoutAuth as withoutAuthInstance,
} from "../../config/axios";
// const userInstance = userInstances;
// const gameInstance = gameInstances;
const withoutAuth = withoutAuthInstance;
const initialState = {
  isLoading: false,
};

export const userRegister = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await withoutAuth().post("/api/auth/register", data);
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

export const userLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await withoutAuth().post("/api/auth/login", data);
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

export const userForGetPassWord = createAsyncThunk(
  "auth/forgetPass",
  async (data, { rejectWithValue }) => {
    try {
      const res = await withoutAuth().post("/api/auth/forgetPass", data);
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

export const userResetPassword = createAsyncThunk(
  "auth/resetPass",
  async (data, { rejectWithValue }) => {
    try {
      const res = await withoutAuth().post("/api/auth/resetPass", data);
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

export const userVerification = createAsyncThunk(
  "auth/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await withoutAuth().patch(
        `/api/auth/verify/${data?.emailVerificationHash}`
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userRegister.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(userForGetPassWord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userForGetPassWord.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userForGetPassWord.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(userResetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userResetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userResetPassword.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(userVerification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userVerification.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userVerification.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
