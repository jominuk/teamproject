import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todosSlice";
import comments from "../modules/commentsSlice";

const store = configureStore({ reducer: { todos, comments } });
export default store;
