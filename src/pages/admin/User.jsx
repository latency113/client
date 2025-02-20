import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import UserService from "./../../services/user.service";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await UserService.get();
      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้!");
    }
  };

  const handleDeleteUser = async (id) => {
    Swal.fire({
        title: 'ต้องการลบผู้ใช้นี้ใช่มั้ย',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'gray',
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ตกลง'
    }).then(async (result) => { 
        if (result.isConfirmed) {
            try {
                await UserService.deleteUser(id);
                setUsers(users.filter((users) => users.id !== id));
                Swal.fire(
                    'Deleted!',
                    'Your users has been deleted.',
                    'success'
                );
            } catch (err) {
                console.error("Delete error:", err);
                Swal.fire(
                    'Error!',
                    'เกิดข้อผิดพลาด: ' + err.message,
                    'error'
                );
            }
        }
    });
};

  const handleEditRole = async () => {
    if (!newRole || !selectedUser) {
      toast.error("กรุณาเลือกบทบาทและผู้ใช้");
      return;
    }

    try {
      const response = await UserService.updateRole(selectedUser.id, newRole);

      if (response.status === 200) {
        toast.success("อัปเดตบทบาทผู้ใช้สำเร็จ");
        setSelectedUser(null);
        setNewRole("");
        fetchUsers();
      } else {
        toast.error("เกิดข้อผิดพลาดในการอัปเดตบทบาท");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการอัปเดตบทบาท"
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
    <div className="flex h-screen bg-gray-100"> {/* Added h-screen and bg-gray-100 */}
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6"> {/* Added overflow-y-auto */}
        <Navbar />
        <div className="container mx-auto"> {/* Added container for centering */}
          <h2 className="text-3xl font-bold my-6 text-center text-gray-800">
            Manage Users
          </h2>

          <div className="bg-white shadow-md rounded-lg p-6 min-h-screen"> {/* Card for the table */}
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">User List</h3>
            <table className="w-full border-collapse table-auto"> {/* Added table-auto */}
              <thead>
                <tr className="bg-gray-200 text-gray-700"> {/* Improved header styling */}
                  <th className="p-3 text-left font-medium uppercase tracking-wider">Username</th>
                  <th className="p-3 text-left font-medium uppercase tracking-wider">Email</th>
                  <th className="p-3 text-left font-medium uppercase tracking-wider">Role</th>
                  <th className="p-3 text-left font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50"> {/* Added hover effect */}
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role === "admin" ? "ผู้ดูแลระบบ" : "ผู้ใช้งาน"}</td>
                    <td className="p-3 flex space-x-2"> {/* Added flex for buttons */}
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setNewRole(user.role);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded"
                      >
                        Edit Role
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {selectedUser && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Edit Role for <span className="text-red-500">{selectedUser.name}</span>
                </h3>
                <div>
                  <select
                    value={newRole}
                    onChange={(e) => {
                      console.log("Selected role:", e.target.value);
                      setNewRole(e.target.value);
                    }}
                    className="border p-2 rounded w-full mb-4"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">ผู้ดูแลระบบ</option>
                    <option value="user">ผู้ใช้งาน</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2"> {/* Aligned buttons to the right */}
                  <button
                    onClick={handleEditRole}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
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
    </div>
  );
};

export default User;
