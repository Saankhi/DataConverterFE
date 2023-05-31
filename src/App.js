import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./Pages/UserHome";
import AdminHome from "./Pages/AdminHome"
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import IPFileDefinition from "./Pages/IPFileDefinition";
import OPFileDefinition from "./Pages/OPFileDefinition";
import AdminAboutUs from "./Pages/AdminAboutUs";
import AdminContactUs from "./Pages/AdminContactUs";
import Template from "./Components/Template";
import MyTemplates from "./Pages/MyTemplates";
import Mapping from "./Pages/Mapping";


export default function App() {


  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/mytemplates" element={<MyTemplates />} />
          <Route path="/aboutus" element={<AdminAboutUs />} />
          <Route path="/contactus" element={<AdminContactUs />} />
          <Route path="/template" element={<Template />} />
          <Route path="/mapping" element={<Mapping />} />
        </Routes>
      </>
    </Router>

  );
}


