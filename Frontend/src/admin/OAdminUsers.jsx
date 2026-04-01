import { useEffect, useState } from "react";
import { userAPI } from "../services/api"; // create this API function

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers();
      setUsers(response.data.data);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
      try {
      setLoading(true);
      const response = await userAPI.deleteUser(id);
      setUsers(response.data.data);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="text-center py-20">Loading users...</div>;

  if (users.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">No Users Found</h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-dark mb-8">👥 All Users</h1>
        <table className="w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Joined At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <button onClick={handleDeleteUser} className="bg-red-500 p-2 rounded">Remove</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
