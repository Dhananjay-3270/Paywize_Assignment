import { createSlice } from "@reduxjs/toolkit";

const toolSlice = createSlice({
  name: "tool",
  initialState: {
    currentTool: "brush",
    color: "#000000",
    brushSize: 1,
  },
  reducers: {
    setTool(state, action) {
      console.log("current tool changed to ", action.payload);
      state.currentTool = action.payload;
    },
    setColor(state, action) {
      state.color = action.payload;
    },
    setBrushSize(state, action) {
      state.brushSize = action.payload;
    },
  },
});
export const { setTool, setColor, setBrushSize } = toolSlice.actions;
export default toolSlice.reducer;
