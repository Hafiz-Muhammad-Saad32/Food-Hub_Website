import { Link } from "react-router-dom";

export default function AdminNavbar({ user, handleLogout }) {
  return (
    <nav className="bg-gray-800 text-white shadow p-4 flex justify-between items-center">
      <Link to="/admin" className="font-bold text-xl">
        Admin Panel
      </Link>

      <div className="space-x-6 flex items-center">
        <Link to="/admin/orders" className="hover:underline">
          Orders
        </Link>
        <Link to="/admin/users" className="hover:underline">
          Users
        </Link>
        <Link to="/admin/foods" className="hover:underline">
          Foods
        </Link>
        <span className="ml-4">Hi, {user.name}</span>
        <button
          onClick={handleLogout}
          className="ml-4 px-3 py-1 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
