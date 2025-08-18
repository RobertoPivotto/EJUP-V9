import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./lib/CartContext";

import { Toaster } from "@/components/ui/sonner";

// Importar sistema de tratamento de erros
import "./lib/errorHandler";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        <Toaster />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
