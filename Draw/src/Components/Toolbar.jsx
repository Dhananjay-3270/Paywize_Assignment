import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { undo, redo } from "../redux/canvasSlice";
import { setTool, setColor, setBrushSize } from "../redux/toolSlice";
import styles from "./Toolbar.module.css";
import { SlActionRedo, SlActionUndo } from "react-icons/sl";
import { BsBrush } from "react-icons/bs";
import { SlPencil } from "react-icons/sl";
import { FaEraser } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";
import { CiText } from "react-icons/ci";
import { IoMdColorPalette } from "react-icons/io";
const Toolbar = () => {
  const brushSize = useSelector((state) => state.tool.brushSize);
  
  const dispatch = useDispatch();
  return (
    <>
      <div className={styles.toolbar}>
        <button
          onClick={() => dispatch(setTool("brush"))}
          className={styles.btn}
        >
          <BsBrush />
        </button>
        <button onClick={() => dispatch(setTool("line"))}
           className={styles.btn}>
          <SlPencil />
        </button>
        <button onClick={() => dispatch(setTool("eraser"))}
           className={styles.btn}
          >
          <FaEraser />
        </button>
        <button onClick={() => dispatch(setTool("rectangle"))}
           className={styles.btn}
          >
          <LuRectangleHorizontal />
        </button>
        <button onClick={() => dispatch(setTool("circle"))}
           className={styles.btn}
          >
          <FaRegCircle />
        </button>
        <button onClick={() => dispatch(setTool("text"))}
           className={styles.btn}
          >
          <CiText />
        </button>
        <button onClick={() => dispatch(undo())}
           className={styles.btn}>
          <SlActionUndo />
        </button>
        <button onClick={() => dispatch(redo())}
           className={styles.btn}
          >
          <SlActionRedo />
        </button>
        <input
          className="color"
          type="color"
          onChange={(e) => dispatch(setColor(e.target.value))}
        />
        <IoMdColorPalette />
      </div>
      <div>
        <input
          type="range"
          min="1"
          max="25"
          value={brushSize}
          onChange={(e) => dispatch(setBrushSize(e.target.value))}
        />
        <label>Size</label>
      </div>
    </>
  );
};
export default Toolbar;
