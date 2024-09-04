// Canvas.jsx
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAction, addbrushaction } from "../redux/canvasSlice";
import io from "socket.io-client"; 
import styles from "./Canvas.module.css";


const SOCKET_SERVER_URL = "http://localhost:5000/";

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

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    // Listen for incoming brush actions
    socket.on("brushAction", (brushAction) => {
      dispatch(addbrushaction(brushAction));
    });

    // Listen for incoming shape actions
    socket.on("shapeAction", (shapeAction) => {
      dispatch(addAction(shapeAction));
    });

    return () => {
      socket.disconnect(); // Clean up on component unmount
    };
  }, [dispatch]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.lineCap = "round";
    contextRef.current = context;
  }, [color, brushSize]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    setStartPos({ x: startX, y: startY });
    setDrawing(true);

    if (currentTool === "brush") {
      dispatch(addbrushaction({ point: { x: startX, y: startY }, newStroke: true }));
      const context = contextRef.current;
      context.beginPath();
      context.moveTo(startX, startY);

      // Emit brsh action to server
      const socket = io(SOCKET_SERVER_URL);
      socket.emit("brushAction", { point: { x: startX, y: startY }, newStroke: true });
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
      context.lineTo(currentX, currentY);
      context.stroke();
      dispatch(addbrushaction({ point: { x: currentX, y: currentY }, newStroke: false }));

      // Emit brush action t server
      const socket = io(SOCKET_SERVER_URL);
      socket.emit("brushAction", { point: { x: currentX, y: currentY }, newStroke: false });
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
      redrawCanvas();
      drawShape(context, startPos, { x: currentX, y: currentY }, currentTool, color, brushSize);
    }
  };

  const handleMouseUp = (e) => {
    setDrawing(false);
    if (currentTool !== "brush") {
      const rect = canvasRef.current.getBoundingClientRect();
      const endX = e.clientX - rect.left;
      const endY = e.clientY - rect.top;
      const newShape = {
        type: currentTool,
        start: startPos,
        end: { x: endX, y: endY },
        size: brushSize,
        color: color,
      };
      dispatch(addAction(newShape));

      // Emit shape action to server
      const socket = io(SOCKET_SERVER_URL);
      socket.emit("shapeAction", newShape);
    }
  };

  const redrawBrush = () => {
    const context = contextRef.current;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    bactions.forEach((stroke) => {
      context.beginPath();
      stroke.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      });
      context.stroke();
    });
  };

  const redrawCanvas = () => {
    redrawBrush();
    const context = contextRef.current;
    actions.forEach((shape) => {
      drawShape(context, shape.start, shape.end, shape.type, shape.color, shape.size);
    });
  };

  useEffect(() => {
    redrawCanvas();
  }, [actions, bactions]);

  const drawShape = (context, start, end, shape, color, size) => {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = size;

    if (shape === "rectangle") {
      context.rect(start.x, start.y, end.x - start.x, end.y - start.y);
    } else if (shape === "circle") {
      const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      context.arc(start.x, start.y, radius, 0, 2 * Math.PI);
    } else if (shape === "line") {
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
    }

    context.stroke();
  };

  return (
    <div>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={750}
        height={450}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default Canvas;
