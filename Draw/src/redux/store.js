import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./canvasSlice";
import toolReducer from "./toolSlice";
export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    tool: toolReducer,
  },
});
