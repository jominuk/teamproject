import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const __addComments = createAsyncThunk(
  "addComments",
  async (comment, thunkAPI) => {
    try {
      await axios.post("http://localhost:3001/comments", comment);

      return thunkAPI.fulfillWithValue(comment);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/comments");
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [__addComments.pending]: (state, action) => {
      state.isLoading = true;
      // console.log("pending :", action);
    },
    [__addComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = [...state.comments, action.payload];
      // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      // console.log("fulfilled :", action);
    },
    [__addComments.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      // console.log("rejected :", action);
    },

    [__getComments.pending]: (state, action) => {
      state.isLoading = true;
      // console.log("pending :", action);
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(state.comments, action.payload);
      state.comments = action.payload;
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default commentsSlice.reducer;
