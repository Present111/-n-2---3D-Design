import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import DroppableCanvas from "./components/DroppableCanvas";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Sidebar />
      <DroppableCanvas />
    </DndProvider>
  );
}
