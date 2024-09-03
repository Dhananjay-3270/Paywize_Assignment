import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAction, undo, redo, addbrushaction } from "../redux/canvasSlice";
import styles from "./Canvas.module.css";

const Canvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setDrawing] = useState(false);
    const dispatch = useDispatch();
    const actions = useSelector((state) => state.canvas.actions);
    const bactions = useSelector((state) => state.canvas.brushactions);
    const currentTool = useSelector((state) => state.tool.currentTool);
    const color = useSelector((state) => state.tool.color);
    const brushSize = useSelector((state) => state.tool.brushSize);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const initCanvas = () => {
    
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.strokeStyle = color;
        context.lineWidth = brushSize;
        contextRef.current = context;
      };

  const handleMouseDown = () => {};

  const handleMouseMove = () => {};

  const handleMouseUp = () => {};

  return (
    <canvas
      className={!isDrawing ? styles.canvas : styles.canvasdrawing}
      ref={canvasRef}
      width={750}
      height={450}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Canvas;
