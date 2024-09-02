import { createSlice } from "@reduxjs/toolkit";

export const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    actions: [],
    brushactions: [],
    undoStack: [],
  },
  reducers: {
    addbrushaction(state, action) {
      // Add the new points to the last brush action
      if (state.brushactions.length === 0 || action.payload.newStroke) {
        state.brushactions.push([action.payload.point]);
      } else {
        state.brushactions[state.brushactions.length - 1].push(
          action.payload.point
        );
      }
    },

    addAction(state, action) {
      state.actions.push(action.payload);
      state.undoStack = [];
    },
    undo(state) {
      if (state.actions.length > 0) {
        const lastaction = state.actions.pop();
        state.undoStack.push(lastaction);
      }
    },
    redo(state) {
      if (state.undoStack.length > 0) {
        const lastUndone = state.undoStack.pop();
        state.actions.push(lastUndone);
      }
    },
  },
});

export const { addAction, undo, redo, addbrushaction } = canvasSlice.actions;
export default canvasSlice.reducer;
