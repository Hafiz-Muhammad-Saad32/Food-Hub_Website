import { useEffect, useState } from "react";
import { orderAPI } from "../services/api";
import { Link } from "react-router-dom";
import { Package, MapPin, Phone } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status Color Mapping
  const statusStyles = {
    completed: {
      card: "bg-emerald-50/30 border-emerald-500 ",
      header: "bg-emerald-100/50 border-emerald-200",
      badge: "bg-emerald-500 text-white",
      accent: "text-emerald-600"
    },
    pending: {
      card: "bg-amber-50/30 border-amber-500",
      header: "bg-amber-100/50 border-amber-200",
      badge: "bg-amber-500 text-white",
      accent: "text-amber-600"
    },
    preparing: {
      card: "bg-blue-50/30 border-blue-500",
      header: "bg-blue-100/50 border-blue-200",
      badge: "bg-blue-600 text-white",
      accent: "text-blue-600"
    },
    cancelled: {
      card: "bg-red-50/30 border-red-500",
      header: "bg-red-100/50 border-red-200",
      badge: "bg-red-600 text-white",
      accent: "text-red-600"
    },
    default: {
      card: "bg-slate-50 border-slate-500",
      header: "bg-slate-100 border-slate-200",
      badge: "bg-slate-500 text-white",
      accent: "text-slate-600"
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getUserOrders();
        setOrders(response.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Fetching Orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <Package className="text-slate-300" size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">No orders yet.</h2>
        <p className="text-slate-500 text-sm mt-2 mb-8 max-w-xs">Hungry? Place your first order!</p>
        <Link to="/" className="px-8 py-3 bg-orange-500 text-white font-black rounded-xl shadow-lg shadow-orange-200 text-sm">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">My <span className="text-orange-500">Orders.</span></h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Transaction History</p>
        </header>

        <div className="space-y-6">
          {orders.map((order) => {
            const style = statusStyles[order.status] || statusStyles.default;
            const subtotal = order.items.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
            const total = subtotal + 2.99 + (subtotal * 0.1);

            return (
              <div key={order._id} className={`border rounded-[2rem] overflow-hidden transition-all shadow-sm ${style.card}`}>
                
                {/* Header (Dynamic Color) */}
                <div className={`px-8 py-4 border-b flex justify-between items-center ${style.header}`}>
                  <div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Ref ID</span>
                    <p className="text-sm font-black text-slate-900">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm ${style.badge}`}>
                    {order.status}
                  </span>
                </div>

                <div className="p-6 grid md:grid-cols-2 gap-6">
                  {/* Items */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Basket</h4>
                    {order.items.map((item) => (
                      <div key={item.food._id} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
                            <img src={item.food.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-800 line-clamp-1">{item.food.name}</p>
                            <p className="text-[10px] font-bold text-slate-400">{item.quantity} Unit(s)</p>
                          </div>
                        </div>
                        <p className="text-xs font-black text-slate-900">${(item.food.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Summary & Address */}
                  <div className="bg-white/60 border-black/60 backdrop-blur-sm rounded-2xl p-5 flex flex-col justify-between border  shadow-inner">
                    <div className="space-y-1.5 pb-3 border-b border-slate-100">
                      <div className=" flex justify-between text-[11px] font-bold text-slate-500">
                        <span>Items Total</span>
                        <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-slate-900">
                        <span>Paid Amount</span>
                        <span className={style.accent}>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="pt-3 space-y-1.5">
                      <div className="flex items-start gap-2 text-[10px] font-bold text-slate-500">
                        <MapPin size={12} className={style.accent} />
                        <span className="line-clamp-1">{order.address.street}, {order.address.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                        <Phone size={12} className={style.accent} />
                        <span>{order.phone || order.address.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}