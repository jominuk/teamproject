import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comment: [],
  isLoading: false,
  error: null,
};

// export const getComments = createAsyncThunk(
//   "getComments",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.get("http://localhost:3001/comments");
//       // console.log(data);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       // console.log(error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const addComments = createAsyncThunk(
  "addComments",
  async (comment, thunkAPI) => {
    try {
      await axios.post("http://localhost:3sdf001/comments", comment);
      console.log(comment);
      return thunkAPI.fulfillWithValue(comment);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [addComments.pending]: (state, action) => {
      state.isLoading = true;
      // console.log("pending :", action);
    },
    [addComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(state);
      state.comments = [...state.comments, action.payload];
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      console.log("fulfilled :", action);
    },
    [addComments.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      // console.log("rejected :", action);
    },
  },
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
