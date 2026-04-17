import { useState } from 'react'
import "./App.css";
import "./styles/theme.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../layout/layout/Navbar";
import Home from "../pages/pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "../users/users/AddUser";
import EditUser from "../users/users/EditUser";
import ViewUser from "../users/users/ViewUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/adduser" element={<AddUser />} />
            <Route exact path="/edituser/:empId" element={<EditUser />} />
            <Route exact path="/viewuser/:empId" element={<ViewUser />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App
