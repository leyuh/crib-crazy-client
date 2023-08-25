import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/App.css";

import Home from "./pages/Home.js";
import Auth from "./pages/Auth.js";

import Navbar from "./Navbar.js";

function App() {
  return <div id="app">
      <Router>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
  </div>
}

export default App;
