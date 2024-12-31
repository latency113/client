import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // หาก API ส่งข้อมูลในรูปแบบ { user: { role: "admin" } }
        if (res.data.user.role === "admin") {
          setIsAdmin(true);
        } else {
          throw new Error("Not authorized");
        }
      } catch (err) {
        setError("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-bold">🔄 กำลังตรวจสอบสิทธิ์...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
