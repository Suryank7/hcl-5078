import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./component/Home.jsx";
import Login from "./component/Login.jsx";
import Registration from "./component/Registration.jsx";
import Dashboard from "./component/Dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* Backward-compatible route used by older links */}
        <Route path="/register" element={<Registration />} />

        {/* Send unknown URLs to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
