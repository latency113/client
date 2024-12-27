import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // Track the user being edited
  const [newRole, setNewRole] = useState(""); // Track the new role

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/users");
      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้!");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/${userId}`);
      toast.success("ลบผู้ใช้สำเร็จ");
      fetchUsers();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการลบผู้ใช้");
    }
  };

  const handleEditRole = async () => {
    if (!newRole || !selectedUser) {
      toast.error("กรุณาเลือกบทบาทและผู้ใช้");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:4000/api/change-role",
        {
          id: selectedUser.id,
          role: newRole,
        }
      );
      if (response.status === 200) {
        toast.success("อัปเดตบทบาทผู้ใช้สำเร็จ");
        setSelectedUser(null);
        setNewRole("");
        fetchUsers();
      } else {
        toast.error("เกิดข้อผิดพลาดในการอัปเดตบทบาท");
      }
    } catch (error) {
      console.error(
        "Error updating role:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        error.response
          ? error.response.data.message
          : "เกิดข้อผิดพลาดในการอัปเดตบทบาท"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6">
        <Navbar />
        <h2 className="text-2xl font-bold mb-4 text-center mt-5">
          Manage Users
        </h2>

        <div>
          <h3 className="text-xl font-semibold mb-4">User List</h3>
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-2">Username</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border-b p-2">{user.name}</td>
                  <td className="border-b p-2">{user.email}</td>
                  <td className="border-b p-2">{user.role}</td>
                  <td className="border-b p-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setNewRole(user.role);
                      }}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                    >
                      Edit Role
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h3 className="text-2xl font-semibold mb-4">
                Edit Role for {selectedUser.name}
              </h3>
              <div>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="border p-2 rounded w-full mb-4"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleEditRole}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default User;
