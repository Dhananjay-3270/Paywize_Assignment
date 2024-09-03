import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAction, undo, redo, addbrushaction } from "../redux/canvasSlice";
import styles from "./Canvas.module.css";

const Canvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setDrawing] = useState(false);
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
