import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./Pages/UserHome";
import AdminHome from "./Pages/AdminHome"
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import IPFileDefinition from "./Pages/IPFileDefinition";
import OPFileDefinition from "./Pages/OPFileDefinition";


export default function App() {


  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/ipfiledefinition" element={<IPFileDefinition />} />
          <Route path="/opfiledefinition" element={<OPFileDefinition />} />
        </Routes>
      </>
    </Router>

  );
}


