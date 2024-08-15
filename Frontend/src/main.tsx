import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";



axios.defaults.baseURL=import.meta.env.BASE_URL || "http://localhost:4000/api/v1" ; 
axios.defaults.withCredentials = true; // this is used to get the cookies store d in the backend 
const theme = createTheme({
  typography: {
    fontFamily: "Roboto slab,serif",
    allVariants: { color: "white" },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
