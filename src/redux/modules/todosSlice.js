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
      return thunkAPI.fulfillWithValue(payload); // 프로미스가 잘 성공적으로 실행되었는지, fulfilled
    } catch (error) {
      return thunkAPI.rejectWithValue(error); //  실패가 되었는지, rejected
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

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(__editTodo.pending, (state) => {
  //       state.isLoading = true; //네트워크 요청이 시작되면 로딩상태를 true로 변경
  //     })
  //     .addCase(__editTodo.fulfilled, (state, action) => {
  //       state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
  //       state.todos = state.todos.map((user) =>
  //         user.id === action.payload ? action.payload : user
  //       ); // Store에 있는 todos에 서버에서 가져온 todos를 넣는다.
  //     })
  //     .addCase(__editTodo.rejected, (state, action) => {
  //       state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
  //       state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
  //     });
  // },

  // 내가 비동기 작업을 하는 동안에 클라이언트한테 제공해줄 로직
  // 내가 비동기 작업이 끝나고 제공해줄 로직
  // 내가 비동기 작업을 하면서 에러가 났을 때 클라이언트한테 제공해줄 로직
});

export default todosSlice.reducer;
