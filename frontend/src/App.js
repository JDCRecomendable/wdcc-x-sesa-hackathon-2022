import "./App.css";
import Header from "./components/Header";
import RoomsPage from "./pages/RoomsPage";
import ShopPage from "./pages/ShopPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme } from "@mui/material/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#371B58",
      },
      secondary: {
        main: "#371B58",
      },
    },
  });

  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
