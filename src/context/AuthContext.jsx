import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Create a context provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User state
  
    // Check if user is signed in (you might have your own logic here)
    useEffect(() => {
      const userData = localStorage.getItem('userData'); // Example: Check local storage
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }, []);
  
    // Function to set user (sign in)
    const signIn = (userData) => {
      localStorage.setItem('userData', JSON.stringify(userData)); // Example: Store in local storage
      setUser(userData);
    };
  
    // Function to sign out
    const signOut = () => {
      localStorage.removeItem('userData'); // Example: Remove from local storage
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    );
  };