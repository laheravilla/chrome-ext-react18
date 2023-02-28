import React from "react";
import "./contentScript.css";
import path from "path";

export default function App() {
    const containerStyle = {
        position: "absolute",
        top: "50%",
        right: "20px",
        height: "50px",
        width: "50px",
        transform: "translateY(-50%)",
        backgroundColor: "goldenrod",
        borderRadius: "999px",
        backgroundImage: url("../logo192.png"),
    };

  return (
    <div className="vdl-container" style={containerStyle}>
    </div>
  );
}
