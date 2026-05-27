import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import "modern-normalize";
import "./global.css";

import App from "./components/App/App";
import Header from "./components/Header/Header";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
