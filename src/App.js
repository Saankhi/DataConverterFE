import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import UserHome from "./Pages/UserHome";
import AdminHome from "./Pages/AdminHome"
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import AdminAboutUs from "./Pages/AdminAboutUs";
import AdminContactUs from "./Pages/AdminContactUs";
import Template from "./Components/Template";
import MyTemplates from "./Pages/MyTemplates";
import Mapping from "./Pages/Mapping";
import PrivateRoute from "./PrivateRoute";
import Header from "./Components/Header";
import HeaderUser from "./Components/HeaderUser";


export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};


function AppContent() {

  useLocation();  // to re-render the app component while the admin home os getting mounted to check for the role .
  const isLoggedInKey = localStorage.getItem('isLoggedIn')

  const role = JSON.parse(localStorage.getItem('userInfo'))


  return (

    <>

      {isLoggedInKey ? role[0].role === "Admin" ? <Header /> : <HeaderUser /> : null}
      <Routes>
        <Route path="/" element={<PrivateRoute Component={isLoggedInKey ? role[0].role === "Admin" ? AdminHome : UserHome : Login} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userhome" element={<PrivateRoute Component={UserHome} />} />
        <Route path="/adminhome" element={<PrivateRoute Component={AdminHome} />} />
        <Route path="/mytemplates" element={<PrivateRoute Component={MyTemplates} />} />
        <Route path="/aboutus" element={<PrivateRoute Component={AdminAboutUs} />} />
        <Route path="/contactus" element={<PrivateRoute Component={AdminContactUs} />} />
        <Route path="/template" element={<PrivateRoute Component={Template} />} />
        <Route path="/mapping" element={<PrivateRoute Component={Mapping} />} />
      </Routes>
    </>


  );
}


