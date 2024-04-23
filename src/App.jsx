import React, { useState,useContext,useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Login from "./Login";
import Footer from "./Footer";
import Homepage from "./Homepage";
import Signup from "./Signup";
import Profile from "./Profile";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";


function App() {
  
  const router = createBrowserRouter([
    {
      path:"/",
      element: <><Navbar/> <Homepage/></>
    },
    {
      path:"/login",
      element: <><Navbar /> <Login/></>
    },
    {
      path:"/signup",
      element: <><Navbar/> <Signup/></>
    },
    {
      path:"/profile",
      element: <><Navbar /> <Profile/></>
    },
  ])
  return (
    <AuthProvider>
  <>
      
      <RouterProvider router={router} />
     
      <Footer/>
    </>
    </AuthProvider>
  );
}

export default App;
