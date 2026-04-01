import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Users, UtensilsCrossed, LogOut, UserCircle } from "lucide-react";

export default function AdminNavbar({ user, handleLogout }) {
  const location = useLocation();

  // Helper to highlight active link
  const isActive = (path) => location.pathname === path;

  const navLinkClasses = (path) => `
    flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all
    ${isActive(path) 
      ? "bg-orange-500 text-white shadow-lg shadow-orange-900/20" 
      : "text-slate-400 hover:text-white hover:bg-slate-800"}
  `;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Brand Section */}
      <div className="flex items-center gap-8">
        <Link to="/admin" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-110">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-black text-lg leading-none tracking-tighter italic">Admin <span className="text-orange-500 not-italic">Hub.</span></h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Control Center</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/admin/orders" className={navLinkClasses("/admin/orders")}>
            <ShoppingBag size={14} />
            Orders
          </Link>
          <Link to="/admin/users" className={navLinkClasses("/admin/users")}>
            <Users size={14} />
            Users
          </Link>
          <Link to="/admin/foods" className={navLinkClasses("/admin/foods")}>
            <UtensilsCrossed size={14} />
            Foods
          </Link>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-3 border-r border-slate-800 pr-6">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Logged in as</p>
            <p className="text-sm text-white font-bold">{user.name}</p>
          </div>
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 border border-slate-700">
            <UserCircle size={24} />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-rose-500/20 group"
        >
          <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
      </div>
    </nav>
  );
}