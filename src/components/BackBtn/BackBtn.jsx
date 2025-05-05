import React from "react";
import "./BackBtn.css";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";

export default function BackBtn() {
  const navigate = useNavigate();
  return (
    <div className="back-btn-wrapper">
      <Button onClick={() => navigate(-1)}>
        ← <span>Назад</span>
      </Button>
    </div>
  );
}
