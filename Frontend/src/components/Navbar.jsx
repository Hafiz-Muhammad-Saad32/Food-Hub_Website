import { Link } from "react-router-dom";

export default function Navbar({ cartCount, user, handleLogout }) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Main Links */}
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter text-slate-900"
          >
            Food<span className="text-orange-500">Hub</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
            <Link to="/" className="hover:text-orange-500 transition-colors">
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-orange-500 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-orange-500 transition-colors"
            >
              Contact
            </Link>
           

            {/* Conditional Admin Link */}
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-orange-600 bg-orange-50 px-3 py-1 rounded-lg"
              >
                Admin
              </Link>
            )}

            {user && (
              <Link
                to="/order"
                className="hover:text-orange-500 transition-colors"
              >
                Orders
              </Link>
            )}
          </div>
        </div>

        {/* User Actions (Cart & Auth) */}
        <div className="flex items-center gap-6">
          {user && (
            <Link
              to="/cart"
              className="relative p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
            >
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white font-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-bold text-slate-600 px-4 py-2 hover:text-orange-500"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-black bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-orange-500 transition-all shadow-lg shadow-slate-200"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Welcome
                  </p>
                  <p className="text-sm font-black text-slate-900">
                    {user.name}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-xs font-black uppercase tracking-widest text-rose-500 bg-rose-50 rounded-xl hover:bg-rose-100 transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
