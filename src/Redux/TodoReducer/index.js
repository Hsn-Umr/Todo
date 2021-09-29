import { createSlice } from "@reduxjs/toolkit";
const todoSlice = createSlice({
  name: "TODO",
  initialState: {
    todos: [],
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    searchTodobyTitle: (state, action) => {
      console.log(action.payload);
      state.todos = state.todos.filter((i) => i.id == action.payload);
    },
  },
});
export default todoSlice.reducer;
export const { setTodos, searchTodobyTitle } = todoSlice.actions;
