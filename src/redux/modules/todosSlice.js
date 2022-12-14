import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __addTodos = createAsyncThunk(
  "ADD_TODO",
  async (todo, thunkAPI) => {
    try {
      await axios.post("http://localhost:3001/todos", todo);
      return thunkAPI.fulfillWithValue(todo);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getTodoByID = createAsyncThunk(
  "GET_TODO_BY_ID",
  async (payload, thunkAPI) => {
    try {
      const todo = await axios.get(`http://localhost:3001/todos/${payload}`);
      return thunkAPI.fulfillWithValue(todo.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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

export const __editTodo = createAsyncThunk(
  "editTodo",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${payload.id}`, {
        title: payload.title,
        body: payload.body,
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTodoByID = createAsyncThunk(
  "DETAIL_TODOS",
  async (id, thunkAPI) => {
    try {
      const detail = await axios.get(`http://localhost:3001/todos/${id}`);
      return thunkAPI.fulfillWithValue(detail.data);
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
  reducers: {},
  extraReducers: {
    //get
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

    //get 상세페이지
    [__getTodoByID.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodoByID.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.todo = action.payload;
    },
    [__getTodoByID.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //add
    [__addTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__addTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = [...state.todos, action.payload];
    },
    [__addTodos.rejected]: (state, action) => {
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

    [getTodoByID.pending]: (state) => {
      state.isLoading = true;
    },
    [getTodoByID.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [getTodoByID.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //상세 페이지 수정
    [__editTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__editTodo.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
      state.todos = state.todos.map((user) =>
        user.id === action.payload.id ? action.payload : user
      ); // Store에 있는 todos에 서버에서 가져온 todos를 넣는다.
    },
    [__editTodo.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export default todosSlice.reducer;
