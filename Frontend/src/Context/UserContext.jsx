import React, { createContext, useState, useEffect } from "react";
import { api } from "../Utils/AxiosHelper.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Token refresh logic
//   const refreshToken = async () => {
//     try {
//       const response = await api.post("users/refresh-token");
      
//       // If refresh succeeds but no user data in state, fetch current user
//       if (!user && response.data?.success) {
//         const userResponse = await api.post("users/get-current-user");
//         setUser(userResponse.data.user);
//       }
//       return true;
//     } catch (error) {
//       console.error("Token refresh failed:", error.message);
//       if (error.response?.status === 401) {
//         // Invalid refresh token - clear user data
//         setUser(null);
//       }
//       return false;
//     }
//   };

  // Set up token refresh interval
//   useEffect(() => {
//     const setupTokenRefresh = async () => {
//       // Initial check on mount
//       const success = await refreshToken();
      
//       // Only set interval if initial refresh succeeded
//       if (success) {
//         const interval = setInterval(refreshToken, 4.5 * 60 * 1000); // 4.5 minutes
//         return () => clearInterval(interval);
//       }
//     };

//     if (user) setupTokenRefresh();
//   }, [user]);

  // Global error interceptor
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};