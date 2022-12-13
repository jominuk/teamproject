import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __addTodos = createAsyncThunk(
  "ADD_TODO",
  async (todo, thunkAPI) => {
    console.log(todo);
    try {
      await axios.post("http://localhost:3001/todos", todo)
      return thunkAPI.fulfillWithValue(todo)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  todos: [],
  todo: {},
  isLoading: false,
  error: null
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //   deleteTodo: (state, action) => {
    //     state.todos = state.todos.filter((item) => item.id !== action.payload);
    //   },
    //   toggleStatusTodo: (state, action) => {
    //     state.todos = state.todos.map((user) =>
    //       user.id === action.payload ? { ...user, isDone: !user.isDone } : user
    //     );
    //   },
    //   getTodoByID: (state, action) => {
    //     state.todo = state.todos.filter((el) => action.payload === el.id)[0];
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(__addTodo.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(__addTodo.fulfillWithValue, (state, action) => {
  //       state.isLoading = false;
  //       state.todos = action.payload
  //     })
  //     .addCase(__addTodo.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     })
  // }
}
);

export const { __addTodo, deleteTodo, toggleStatusTodo, getTodoByID } =
  todosSlice.actions;
export default todosSlice.reducer;
