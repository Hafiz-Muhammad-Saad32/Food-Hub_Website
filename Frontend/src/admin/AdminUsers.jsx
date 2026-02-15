import { useEffect, useState } from "react";
import { userAPI } from "../services/api";
import {
  Users,
  Mail,
  ShieldCheck,
  Calendar,
  Trash2,
  Search,
  Loader2,
  UserMinus,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import ConfirmToast from "../components/ConfirmToast";

export default function AdminUsers() {
  const showToast = useToast();
  const [confirmData, setConfirmData] = useState({
    isOpen: false,
    id: null,
    name: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers();
      setUsers(response.data.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteClick = (id, name) => {
    // Open the custom modal instead of window.confirm
    setConfirmData({ isOpen: true, id, name });
  };

  const handleConfirmDelete = async () => {
    const { id, name } = confirmData;
    setConfirmData({ ...confirmData, isOpen: false }); // Close modal

    try {
      setLoading(true);
      await userAPI.deleteUser(id);
      await fetchUsers();
      showToast(`${name} has been removed.`, "success"); // Show your regular green toast
    } catch (err) {
      showToast("Could not delete user.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Filter logic for search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 md:px-8 font-sans">
      <ConfirmToast 
        isOpen={confirmData.isOpen}
        message={`This will permanently delete ${confirmData.name}. This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmData({ ...confirmData, isOpen: false })}
      />
      <div className="max-w-6xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">
              User{" "}
              <span className="text-orange-500 not-italic">Directory.</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
              Manage accounts and access permissions
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="SEARCH BY NAME OR EMAIL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-slate-200 pl-12 pr-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 shadow-sm focus:ring-2 focus:ring-orange-500 outline-none w-full md:w-80 transition-all"
            />
          </div>
        </div>

        {/* USERS TABLE/LIST */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
              <Users size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              No Users Found
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              We couldn't find any users matching your criteria.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-6 px-8 text-left text-[10px] font-black uppercase tracking-[0.2em]">
                      Profile
                    </th>
                    <th className="py-6 px-8 text-left text-[10px] font-black uppercase tracking-[0.2em]">
                      Role
                    </th>
                    <th className="py-6 px-8 text-left text-[10px] font-black uppercase tracking-[0.2em]">
                      Joined
                    </th>
                    <th className="py-6 px-8 text-right text-[10px] font-black uppercase tracking-[0.2em]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="group hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-black text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 text-sm leading-tight">
                              {user.name}
                            </p>
                            <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                              <Mail size={12} />
                              <span className="text-[11px] font-bold">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                            user.role === "admin"
                              ? "bg-purple-50 text-purple-600 border-purple-100"
                              : "bg-slate-50 text-slate-500 border-slate-100"
                          }`}
                        >
                          <ShieldCheck size={10} />
                          {user.role}
                        </span>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Calendar size={14} className="text-slate-300" />
                          <span className="text-xs font-bold">
                            {new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-8 text-right">
                        <button
                          onClick={() => handleDeleteClick(user._id, user.name)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all group/btn"
                        >
                          <UserMinus
                            size={14}
                            className="group-hover/btn:scale-110 transition-transform"
                          />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
