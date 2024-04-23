import React, { useState,useContext,useEffect } from "react";
import "./App.css";

import Footer from "./Footer";

import { AuthProvider } from "./context/AuthContext";



function App() {
  

  return (
    <AuthProvider>
  <>
      <div>hello react</div>
    
     
      <Footer/>
    </>
    </AuthProvider>
  );
}

export default App;
