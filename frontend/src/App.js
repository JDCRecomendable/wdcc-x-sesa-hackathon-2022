import "./App.css";
import Header from "./components/Header";
import RoomsPage from "./pages/RoomsPage";
import ShopPage from "./pages/ShopPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#371B58",
      dark: "#371B58",
      light: "#371B58",
    },
    secondary: {
      main: "#371B58",
      dark: "#371B58",
      light: "#371B58",
    },
  },
});

function App() {
  return (
    <Router>
      <>
        <MuiThemeProvider theme={theme}>
          <Header />
          <Routes>
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
          </Routes>
        </MuiThemeProvider>
      </>
    </Router>
  );
}

export default App;
