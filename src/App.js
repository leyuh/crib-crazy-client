import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/App.css";
import "./styles/Themes.css";

import Home from "./pages/Home.js";
import Themes from "./pages/Themes.js";
import Auth from "./pages/Auth.js";

import Navbar from "./components/Navbar.js";

function App() {
  return <div id="app" className="background default">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/themes" element={<Themes />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  </div>
}

export default App;
