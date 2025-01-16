import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        if (!token) {
          throw new Error("Token not found");
        }

        const res = await axios.post(
          "http://localhost:4000/api/current-admin",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response from API:", res.data.user.role);

        if (res.data.user.role === "admin") {
          setIsAdmin(true);
        } else {
          throw new Error("Not authorized");
        }
      } catch (err) {
        setError("error");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <h1 className="text-xl font-bold">กำลังตรวจสอบสิทธิ์...</h1>
      </div>
    );
  }

  if (error) {
    if (redirect) {
      return <Navigate to="/" />;
    }

    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <h1 className="text-2xl font-bold text-red-500">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</h1>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
