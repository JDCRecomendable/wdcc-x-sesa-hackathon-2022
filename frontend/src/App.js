import "./App.css";
import Header from "./components/Header";
import RoomsPage from "./pages/RoomsPage";
import ShopPage from "./pages/ShopPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
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
