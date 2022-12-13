import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __getTodos = createAsyncThunk(
  "GET_TODOS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// 백단? 노드나 서버

export const __toggleStatusTodo = createAsyncThunk(
  "TOGGLE_STATUS_TODO",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${payload.id}`, {
        isDone: !payload.isDone,
      });
      return thunkAPI.fulfillWithValue(payload.id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
//서버에서 에러가나면??? 에러핸들링ㅇ을 하기 위해서  -> 예외처리를 세심하게하자! , 에러가 터질수있는공간에는 전부 예외처리
// 서버에서 왔다고 가정하고 보여줄 수는 있지만 에러가 있을 수 있기 떄문에 응답값에 따라서 보여주

export const __deleteTodo = createAsyncThunk(
  "DELETE_TODO",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  todos: [],
  todo: {},
  isLoading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodoByID: (state, action) => {
      state.todo = state.todos.filter((el) => action.payload === el.id)[0];
    },
  },

  //그래프 QL!! ===? 서버도 그래프ql로 구현되야 가능 -> 노마드코더 무료강의 추천 (서버, 프론트 )

  // extraReducers:(builder)=>{
  //   builder
  //   .addCase(__getTodos.pending,(state) => {
  //     state.isLoading = true;
  //   })
  //   .addCase(__getTodos.fulfilled,(state,action) => {
  //     state.isLoading = false;
  //     state.todos = action.payload;
  //   })
  //   .addCase(__getTodos.rejected,(state,action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   })
  // }

  extraReducers: {
    //add
    [__getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //토글부분
    [__toggleStatusTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__toggleStatusTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.map((user) =>
        user.id === action.payload ? { ...user, isDone: !user.isDone } : user
      );
    },
    [__toggleStatusTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //딜리트부분
    [__deleteTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getTodoByID } = todosSlice.actions;
export default todosSlice.reducer;
