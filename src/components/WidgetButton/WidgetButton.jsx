// components/WidgetButton.jsx
import Button from "../Buttons/Button";
export default function WidgetButton({ label, filled, onClick }) {
  return (
    <Button
      onClick={onClick}
      variant={filled ? "primary" : "ghost"}
      style={{ width: 180, height: 120 }}
    >
      {filled ? label : `+ ${label}`}
    </Button>
  );
}