import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  todo: {},
  isLoading: false,
  error: null,
};

export const __editTodo = createAsyncThunk(
  "editTodo",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      await axios.patch(`http://localhost:3001/todos/${payload.id}`, {
        id: payload.id,
        title: payload.title,
        body: payload.body,
      });
      return thunkAPI.fulfillWithValue(payload); // 프로미스가 잘 성공적으로 실행되었는지, fulfilled
    } catch (error) {
      return thunkAPI.rejectWithValue(error); //  실패가 되었는지, rejected
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    toggleStatusTodo: (state, action) => {
      state.todos = state.todos.map((user) =>
        user.id === action.payload ? { ...user, isDone: !user.isDone } : user
      );
    },
    getTodoByID: (state, action) => {
      state.todo = state.todos.filter((el) => action.payload === el.id)[0];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(__editTodo, (state, action) => {
        state.todo = state.todos.map((user) =>
          user.id === action.payload ? action.payload : user
        );
      })
      .addCase();
  },

  // 내가 비동기 작업을 하는 동안에 클라이언트한테 제공해줄 로직
  // 내가 비동기 작업이 끝나고 제공해줄 로직
  // 내가 비동기 작업을 하면서 에러가 났을 때 클라이언트한테 제공해줄 로직

  // extraReducers: {
  //   [__editTodo.fulfilled]: (state, action) => {
  //     state.todos = state.todos.map((user) =>
  //       user.id === action.payload ? { ...user, isDone: !user.isDone } : user
  //     );
  //   },
  // },
});

export const { addTodo, deleteTodo, toggleStatusTodo, getTodoByID } =
  todosSlice.actions;
export default todosSlice.reducer;
