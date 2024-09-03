
import { useSelector, useDispatch } from "react-redux";
import {
  undo,
  redo,
  removeLastBrushAction,
  redoLastBrushAction,
} from "../redux/canvasSlice";
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
  const currentTool = useSelector((state) => state.tool.currentTool);
  const dispatch = useDispatch();

  const handleUndo = () => {
    if (currentTool === "brush") {
      dispatch(removeLastBrushAction());
    } else {
      dispatch(undo());
    }
  };

  const handleRedo = () => {
    if (currentTool === "brush") {
      dispatch(redoLastBrushAction());
    } else {
      dispatch(redo());
    }
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <button onClick={() => dispatch(setTool("brush"))} className={styles.btn}>
          <BsBrush />
        </button>
        <button onClick={() => dispatch(setTool("line"))} className={styles.btn}>
          <SlPencil />
        </button>
        <button onClick={() => dispatch(setTool("eraser"))} className={styles.btn}>
          <FaEraser />
        </button>
        <button onClick={() => dispatch(setTool("rectangle"))} className={styles.btn}>
          <LuRectangleHorizontal />
        </button>
        <button onClick={() => dispatch(setTool("circle"))} className={styles.btn}>
          <FaRegCircle />
        </button>
        <button onClick={() => dispatch(setTool("text"))} className={styles.btn}>
          <CiText />
        </button>
        <button onClick={handleUndo} className={styles.btn}>
          <SlActionUndo />
        </button>
        <button onClick={handleRedo} className={styles.btn}>
          <SlActionRedo />
        </button>
        <input
          type="color"
          onChange={(e) => dispatch(setColor(e.target.value))}
          className={styles.btn}
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
        <label>{brushSize}</label>
      </div>
    </div>
  );
};

export default Toolbar;
