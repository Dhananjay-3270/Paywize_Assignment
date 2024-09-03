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

      const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;
        setStartPos({ x: startX, y: startY });
        dispatch(
          addbrushaction({ point: { x: startX, y: startY }, newStroke: true })
        );
        setDrawing(true);
    
        if (currentTool === "brush") {
          const context = contextRef.current;
          context.beginPath();
          context.moveTo(startX, startY);
        }
      };

      const handleMouseMove = (e) => {
        if (!isDrawing) return;
    
        const canvas = canvasRef.current;
        const context = contextRef.current;
        const rect = canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
    
        if (currentTool === "brush") {
          drawBrush(context, { x: currentX, y: currentY }, color, brushSize);
          dispatch(
            addbrushaction({
              point: { x: currentX, y: currentY },
              newStroke: false,
            })
          );
        } else {
          context.clearRect(0, 0, canvas.width, canvas.height);
          redrawCanvas();
          drawShape(
            context,
            startPos,
            { x: currentX, y: currentY },
            currentTool,
            color,
            brushSize
          );
        }
      };
    
      const handleMouseUp = (e) => {
        if (!isDrawing) return;
    
        const rect = canvasRef.current.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;
        const s = brushSize;
        const clr = color;
        if (currentTool !== "brush") {
          const newShape = {
            type: currentTool,
            start: startPos,
            end: { x: endX, y: endY },
            size: s,
            color: clr,
          };
          dispatch(addAction(newShape));
        }
    
        setDrawing(false);
      };

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
