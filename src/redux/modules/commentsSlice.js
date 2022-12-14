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
      await axios.post(
        "https://mighty-basin-21011.herokuapp.com/comments",
        comment
      );

      return thunkAPI.fulfillWithValue(comment);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __patchComment = createAsyncThunk(
  "PATCH_COMMENT",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(
        `https://mighty-basin-21011.herokuapp.com/comments/${payload.id}`,
        {
          comment: payload.comment,
        }
      );

      return thunkAPI.fulfillWithValue({
        id: payload.id,
        comment: payload.comment,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        "https://mighty-basin-21011.herokuapp.com/comments"
      );
      const response = data.data.filter((el) => el.postId === payload);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteCommentByTodoID = createAsyncThunk(
  "DELETE_COMMENT_BY_TODO_ID",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `https://mighty-basin-21011.herokuapp.com/comments`
      );
      data.forEach((el) =>
        el.postId === payload
          ? axios.delete(
              `https://mighty-basin-21011.herokuapp.com/comments/${el.id}`
            )
          : null
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const __deleteComments = createAsyncThunk(
  "deleteComments",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(
        `https://mighty-basin-21011.herokuapp.com/comments/${payload}`
      );
      return thunkAPI.fulfillWithValue(payload);
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

    //add
    [__addComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__addComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = [...state.comments, action.payload];
      // Store??? ?????? todos??? ???????????? ????????? todos??? ????????????.
    },
    [__addComments.rejected]: (state, action) => {
      state.isLoading = false; // ????????? ???????????????, ???????????? ????????? ????????????, false??? ???????????????.
      state.error = action.payload; // catch ??? error ????????? state.error??? ????????????.
    },

    //get
    [__getComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.comments = action.payload;
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //delete
    [__deleteComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter(
        (item) => item.id !== action.payload
      );
    },
    [__deleteComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ????????? ????????????
    [__deleteCommentByTodoID.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteCommentByTodoID.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter(
        (el) => el.postId !== action.payload
      );
    },
    [__deleteCommentByTodoID.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ?????? ????????????
    [__patchComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__patchComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.map((el) =>
        el.id === action.payload.id
          ? { ...el, comment: action.payload.comment }
          : el
      );
    },
    [__patchComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default commentsSlice.reducer;
