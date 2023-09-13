import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./styles/App.css";
import "./styles/ThemesModule.css";

import Home from "./pages/Home.js";
import Themes from "./pages/Themes.js";
import Auth from "./pages/Auth.js";

import Navbar from "./components/Navbar.js";

function App() {
  const [theme, setTheme] = useState("default");

  return <div id="app" className={`background ${theme}`}>
    <Router>
      <Navbar
        setTheme={setTheme}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/themes" element={<Themes 
          theme={theme}
          setTheme={setTheme}
        />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  </div>
}

export default App;
