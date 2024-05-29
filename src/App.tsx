import React from "react";
import "./App.css";
import TeamPage from "./pages/TeamPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./i18n";
import LanguageSwitcher from "./components/LanguaeSwitcher";
const App: React.FC = () => {
  return (
    <div className="App">
      <LanguageSwitcher />
      <Router>
        <Routes>
          <Route path="/teams/:id" element={<TeamPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
