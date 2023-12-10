import React from "react";
import "./assets/AppBar.css";
import logo from "./assets/AppBar.logo.svg";
import Converter from "./components/Converter";
import NotFound from "./components/NotFound";
import "./assets/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <nav className="AppBar">
            <img
              className="AppBar-logo"
              src={logo}
              aria-label="people"
              alt="People"
            />
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Converter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
