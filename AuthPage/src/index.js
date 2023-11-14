import { createRoot } from "react-dom/client";
import AuthPage from "./components/AuthPage";
import "./styles/reset.css";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <div style={{ display: "inline-block", width: "1440px", background: "#463e3e" }} data-ignore="used only for top most containter width">
    <AuthPage />
  </div>
);
