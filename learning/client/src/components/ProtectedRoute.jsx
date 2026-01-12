import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import API from "../api/axios";

export default function ProtectedRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await API.get("/auth/me");
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
