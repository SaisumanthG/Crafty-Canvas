import { createRoot } from "react-dom/client";
import { initStorage } from "./lib/siteStorage";
import App from "./App.tsx";
import "./index.css";

// Initialize IndexedDB storage before rendering
initStorage().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
}).catch(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
