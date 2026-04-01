import { useEffect, useState } from "react";
import { orderAPI } from "../services/api";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  User,
  MapPin,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";

export default function AdminOrders() {
  const showToast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  // Configuration for dynamic status styling
  const statusConfig = {
    pending: {
      color: "bg-amber-500 text-white border-amber-600",
      icon: <Clock size={12} />,
    },
    preparing: {
      color: "bg-blue-500 text-white border-blue-600",
      icon: <Package size={12} />,
    },
    completed: {
      color: "bg-emerald-500 text-white border-emerald-600",
      icon: <CheckCircle size={12} />,
    },
    cancelled: {
      color: "bg-rose-500 text-white border-rose-600",
      icon: <XCircle size={12} />,
    },
  };

  // console.log(orders);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getUserOrders(statusFilter);
      setOrders(response.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      showToast("Error fetching orders","error")
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingStatusId(id);
      await orderAPI.updateOrderStatus(id, status);
      // Instant local state update
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: status } : order,
        ),
      );
    } catch (err) {
      console.error("Update error:", err);
      showToast("Failed to update order status.","error");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER & FILTER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">
              Order{" "}
              <span className="text-orange-500 not-italic">Management.</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
              Live Customer Requests & Fulfillment
            </p>
          </div>

          <div className="relative inline-block">
            <select
              value={statusFilter}
              onChange={(e) =>
                setSearchParams(
                  e.target.value ? { status: e.target.value } : {},
                )
              }
              className="appearance-none bg-white border border-slate-200 px-6 py-3 pr-12 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 shadow-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
            >
              <option value="">All Orders</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronRight size={14} className="rotate-90" />
            </div>
          </div>
        </div>

        {/* ORDERS LIST */}
        {orders.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
              <Package size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              No Orders Found
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              No customers have placed orders with this status yet.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              if (!order.user) return null; // skip orders with no user

              return (
                <div
                  key={order._id}
                  className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-fadeIn transition-all hover:shadow-xl hover:shadow-slate-200/50"
                >
                  {/* DARK TOP BAR */}
                  <div className="bg-slate-900 p-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500">
                        <Package size={24} />
                      </div>
                      <div>
                        <h3 className="font-black tracking-tight text-lg">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          System Ref: {order._id}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        Update Status
                      </span>
                      <div className="relative">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          disabled={updatingStatusId === order._id}
                          className={`appearance-none relative z-10 px-6 py-2.5 pr-10 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all cursor-pointer outline-none shadow-lg disabled:opacity-50 ${
                            statusConfig[order.status]?.color ||
                            "bg-slate-700 text-white border-slate-600"
                          }`}
                        >
                          <option
                            value="pending"
                            className="bg-white text-slate-900"
                          >
                            Pending
                          </option>
                          <option
                            value="preparing"
                            className="bg-white text-slate-900"
                          >
                            Preparing
                          </option>
                          <option
                            value="completed"
                            className="bg-white text-slate-900"
                          >
                            Completed
                          </option>
                          <option
                            value="cancelled"
                            className="bg-white text-slate-900"
                          >
                            Cancelled
                          </option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-white/80">
                          {updatingStatusId === order._id ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <ChevronRight size={12} className="rotate-90" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* INFO GRID */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-50">
                      {/* User Card */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                          Customer
                        </h4>
                        <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 group-hover:bg-slate-100/50 transition-colors">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400">
                              <User size={18} />
                            </div>
                            <div>
                              <p className="font-black text-slate-900 text-sm leading-none">
                                {order.user.name || "Unknown user"}
                              </p>
                              <p className="text-[11px] font-bold text-slate-500 mt-1">
                                {order.user.email || "no email"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Card */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                          Ship To
                        </h4>
                        <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 group-hover:bg-slate-100/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <MapPin
                              size={16}
                              className="text-orange-500 mt-0.5 shrink-0"
                            />
                            <p className="font-bold text-slate-900 text-sm">
                              {order.address.street}, {order.address.city}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-200/50 text-xs font-bold text-slate-500">
                            <Phone size={14} className="text-slate-400" />
                            <span>{order.address.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ORDER ITEMS */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                        Cart Contents
                      </h4>
                      <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden">
                        {order.items.map((item) => (
                          <div
                            key={item.food._id}
                            className="flex items-center justify-between p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                          >
                            <div className="flex items-center gap-5">
                              <div className="relative">
                                {/* <img
                                src={item.food.image || ""}
                                alt={item.food.name}
                                className="w-14 h-14 object-cover rounded-2xl shadow-sm"
                              /> */}
                                <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                                  {item.quantity}
                                </span>
                              </div>
                              <div>
                                {/* <p className="font-black text-slate-900 text-sm tracking-tight">
                                {item.food.name || "no food name comes"}
                              </p> */}
                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                                  ${item.food.price.toFixed(2)} per unit
                                </p>
                              </div>
                            </div>
                            <span className="font-black text-slate-900 text-base">
                              ${(item.food.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FOOTER SUMMARY */}
                    <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-3 px-6 py-2 bg-slate-50 rounded-full border border-slate-100">
                        <div
                          className={`w-2 h-2 rounded-full animate-pulse ${order.status === "completed" ? "bg-emerald-500" : "bg-orange-500"}`}
                        ></div>
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.15em] italic">
                          System Verified Order
                        </span>
                      </div>

                      <div className="text-right flex items-center gap-8">
                        <div className="hidden sm:block">
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                            Base + Tax + Delivery
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            Total Payout
                          </p>
                          <span className="text-4xl font-black text-slate-900 tracking-tighter">
                            $
                            {(
                              order.items.reduce(
                                (sum, item) =>
                                  sum + item.food.price * item.quantity,
                                0,
                              ) *
                                1.1 +
                              2.99
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
