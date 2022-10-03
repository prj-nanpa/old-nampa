import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

import { Router } from "./routers/Router";
const theme = createTheme();

function App() {
  return (
    <div className="App relative w-full h-auto">
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
