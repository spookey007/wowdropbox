import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userInstance as userInstances } from "../../config/axios";
import { socket } from "../../config/socket";
const userInstance = userInstances;

const initialState = {
  //Loading flags
  isLoading: {
    getUser: false,
    updateUser: false,
    uploadProfileImage: false,
    updateAddress: false,
    deleteAddress: false,
  },
  userDetails: {},
  userCartTotal: 0,
};

// A common function to fetch user details
export const getUserDetails = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userInstance().get("/api/user/getUser");
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

// To update user details from profile section user info form
export const updateUserDetails = createAsyncThunk(
  "/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userInstance().put("/api/user/updateUser", data);
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

// To update user profile picture
export const uploadProfileImage = createAsyncThunk(
  "/uploadProfileImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userInstance().post(
        "/api/user/uploadProfileImage",
        data
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

// Adding new shipping address
export const updateAddress = createAsyncThunk(
  "/updateShippingAddress",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userInstance().put("/api/user/updateShippingAddress", {
        shippingAddress: data,
      });
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

// To edit and update shipping address
export const editAddress = createAsyncThunk(
  "/editShippingAddress",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userInstance().put(
        `/api/user/editShippingAddress/${data?._id}`,
        data
      );
      return {
        resultData: res.data,
      };
    } catch (err) {
      return rejectWithValue({
        msg: err?.response?.data?.msg || "Something went wrong",
        code: err?.response?.data?.code || 500,
      });
    }
  }
);

// To delete shipping address
export const deleteAddress = createAsyncThunk(
  "/deleteShippingAddress",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userInstance().put(
        `/api/user/deleteShippingAddress/${data}`
      );
      return {
        resultData: res.data,
      };
    } catch (err) {
      return rejectWithValue({
        msg: err?.response?.data?.msg || "Something went wrong",
        code: err?.response?.data?.code || 500,
      });
    }
  }
);

// To set a default shipping address
export const setDefaultAddress = createAsyncThunk(
  "/setDefaultShippingAddress",
  async (id, { rejectWithValue }) => {
    try {
      const res = await userInstance().put(
        `/api/user/setDefaultShippingAddress/${id}`
      );
      return {
        resultData: res.data,
      };
    } catch (err) {
      return rejectWithValue({
        msg: err?.response?.data?.msg || "Something went wrong",
        code: err?.response?.data?.code || 500,
      });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateCartCount: (state, action) => {
      state.userCartTotal = action.payload.count;
    },
    updateUserBoughtBoxes: (state, action) => {
      state.userDetails.boughtBoxes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading.getUser = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading.getUser = false;
        state.userDetails = action?.payload?.resultData?.data || {};
        state.userCartTotal = action?.payload?.resultData?.userCartCount || 0;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.isLoading.getUser = false;
      });

    builder
      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading.updateUser = true;
      })
      .addCase(updateUserDetails.fulfilled, (state) => {
        state.isLoading.updateUser = false;
      })
      .addCase(updateUserDetails.rejected, (state) => {
        state.isLoading.updateUser = false;
      });

    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.isLoading.uploadProfileImage = true;
      })
      .addCase(uploadProfileImage.fulfilled, (state) => {
        state.isLoading.uploadProfileImage = false;
      })
      .addCase(uploadProfileImage.rejected, (state) => {
        state.isLoading.uploadProfileImage = false;
      });

    builder
      .addCase(updateAddress.pending, (state) => {
        state.isLoading.updateAddress = true;
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.isLoading.updateAddress = false;
      })
      .addCase(updateAddress.rejected, (state) => {
        state.isLoading.updateAddress = false;
      });

    builder
      .addCase(editAddress.pending, (state) => {
        state.isLoading.updateAddress = true;
      })
      .addCase(editAddress.fulfilled, (state) => {
        state.isLoading.updateAddress = false;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading.updateAddress = false;
      });

    builder
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading.deleteAddress = true;
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.isLoading.deleteAddress = false;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading.deleteAddress = false;
      });
  },
});

export const { updateCartCount, updateUserBoughtBoxes } = userSlice.actions;

export const autoUpdateUserIneventoryCount = () => (dispatch) => {
  socket.on("inventory.countUpdate", (data) => {
    dispatch(updateCartCount(data));
  });
};

export default userSlice.reducer;
