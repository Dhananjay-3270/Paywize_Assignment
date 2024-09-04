Overview
This project is a collaborative drawing application built with React, Redux, and Socket.io. The application allows multiple users to draw on a shared canvas in real-time. Users can select different tools such as brushes, shapes (rectangle, circle, line), and an eraser. The application supports undo and redo functionalities, and users can adjust brush size and color.

Features
Real-time Collaboration: Multiple users can draw on the canvas simultaneously, with updates broadcasted to all connected clients via Socket.io.
Drawing Tools: Users can select from a variety of tools including:
Brush: Draw freehand strokes with adjustable size and color.
Shapes: Draw rectangles, circles, and lines.
Eraser: Remove parts of the drawing.
Undo/Redo: Users can undo or redo their actions, including brush strokes and shapes.
Customizable Brush: Users can change the brush size and color using a slider and color picker.
Responsive UI: The user interface is styled using CSS modules, making it responsive and easy to use.
Technologies Used
React: For building the user interface components.
Redux: For managing application state, including tools, brush settings, and canvas actions.
Socket.io: For enabling real-time communication between clients and the server.
CSS Modules: For styling the application with scoped CSS to avoid conflicts.
React Icons: For providing easy-to-use icons for the toolbar.
Canvas.jsx: Handles the drawing logic, including mouse events for drawing on the canvas and socket communication.
Toolbar.jsx: Provides the UI for selecting tools, changing brush settings, and performing undo/redo actions.
canvasSlice.js: Redux slice managing the state of actions on the canvas.
toolSlice.js: Redux slice managing the state of the selected tool and brush settings.
Canvas.module.css & Toolbar.module.css: CSS modules for styling the canvas and toolbar components.

Installation and Setup
git clone https://github.com/your-username/collaborative-drawing-app.git

cd Draw

npm install
npm run dev

cd Backend
node server.js



