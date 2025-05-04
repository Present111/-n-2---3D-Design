import React from "react";
import { useDrag } from "react-dnd";

// Danh sách các loại nội thất
const items = [
  { type: "chair", icon: "🪑" },
  { type: "bed", icon: "🛏️" },
  { type: "table", icon: "🪟" },
  { type: "fridge", icon: "🧊" },
  { type: "car", icon: "🚗" },
];

export default function Sidebar() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100px",
        height: "100vh",
        backgroundColor: "rgba(255,255,255,0.95)",
        padding: "10px",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        zIndex: 10,
      }}
    >
      <h4 style={{ marginBottom: 10, fontWeight: "bold" }}>🧰 Items</h4>
      {items.map((item) => (
        <DraggableItem key={item.type} type={item.type} icon={item.icon} />
      ))}
    </div>
  );
}

// Component riêng cho 1 item có thể drag
function DraggableItem({ type, icon }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "furniture", // 👈 phải trùng với bên useDrop
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
        marginBottom: 8,
        padding: "6px 4px",
        background: "#f4f4f4",
        borderRadius: 4,
        fontSize: "14px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      }}
    >
      {icon} {type.charAt(0).toUpperCase() + type.slice(1)}
    </div>
  );
}
