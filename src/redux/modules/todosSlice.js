import { createSlice } from "@reduxjs/toolkit";

const saveData = JSON.parse(localStorage.getItem("todo"))
  ? [...JSON.parse(localStorage.getItem("todo"))]
  : [];

const initialState = {
  todos: [...saveData],
  todo: {},
  isLoading: false,
  error: null,
};

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
});

export const { addTodo, deleteTodo, toggleStatusTodo, getTodoByID } =
  todosSlice.actions;
export default todosSlice.reducer;
