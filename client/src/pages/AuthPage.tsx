import { useState } from "react";
import { Register } from "./auth-pages/Register";
import { Login } from "./auth-pages/Login";
import BgImg from "@/assets/ff-bg.png";
import "@/CSS/flip.css";

export const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      <div className="flip-container">
        <div className={`flip-card ${mode === "login" ? "flipped" : ""}`}>
          {/* FRONT */}
          <div className="flip-face flip-front">
            <Register onSwitch={() => setMode("login")} />
          </div>

          {/* BACK */}
          <div className="flip-face flip-back">
            <Login onSwitch={() => setMode("register")} />
          </div>
        </div>
      </div>
    </div>
  );
};
