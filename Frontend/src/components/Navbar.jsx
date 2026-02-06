import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ cartCount, user, handleLogout }) {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        FoodHub
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
              {cartCount}
            </span>
          )}
        </Link>

        {!user ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="px-4 py-2 text-gray-700">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
