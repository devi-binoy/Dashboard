import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AccountTable from "./components/AccountTable";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/accounts" element={<AccountTable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
