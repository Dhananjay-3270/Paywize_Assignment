import { createSlice } from "@reduxjs/toolkit";

export const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    actions: [], // Stores all drawn shapes and their details
    brushactions: [], // Stores brush strokes for undo/redo
    undoStack: [], // Stack for undo operations
    brushUndoStack: [] // Stack for undo operations specific to brush strokes
  },
  reducers: {
    // Add a new brush action or continue the existing one
    addbrushaction(state, action) {
      if (state.brushactions.length === 0 || action.payload.newStroke) {
        state.brushactions.push([action.payload.point]);
      } else {
        state.brushactions[state.brushactions.length - 1].push(
          action.payload.point
        );
      }
    },

    // Add a new shape action and clear the undo stack
    addAction(state, action) {
      state.actions.push(action.payload);
      state.undoStack = [];
    },

    // Undo the last shape action and push it to the undo stack
    undo(state) {
      if (state.actions.length > 0) {
        const lastAction = state.actions.pop();
        state.undoStack.push(lastAction);
      }
    },

    // Redo the last undone shape action
    redo(state) {
      if (state.undoStack.length > 0) {
        const lastUndone = state.undoStack.pop();
        state.actions.push(lastUndone);
      }
    },

    // Remove the last brush action and push it to the brush undo stack
    removeLastBrushAction(state) {
      if (state.brushactions.length > 0) {
        const lastBrushAction = state.brushactions.pop();
        state.brushUndoStack.push(lastBrushAction);
      }
    },

    // Redo the last undone brush action
    redoLastBrushAction(state) {
      if (state.brushUndoStack.length > 0) {
        const lastUndoneBrush = state.brushUndoStack.pop();
        state.brushactions.push(lastUndoneBrush);
      }
    },
  },
});

export const { addAction, undo, redo, addbrushaction, removeLastBrushAction, redoLastBrushAction } = canvasSlice.actions;
export default canvasSlice.reducer;
