import { useEffect, useState } from "react";
import { orderAPI } from "../services/api"; // admin
// routes & orderAPI
import { useSearchParams } from "react-router-dom";

export default function AdminOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getUserOrders(statusFilter); // fetch all orders
      setOrders(response.data.data);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const statusColors = {
    pending: "bg-yellow-400 text-yellow-800",
    preparing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingStatusId(id);
      await orderAPI.updateOrderStatus(id, status);
      // Update local state to reflect new status instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: status } : order,
        ),
      );
    } catch (err) {
      console.error("Failed to update status", err);
      alert("❌ Failed to update order status. Try again.");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading orders...</div>;
  }

  return (
    <div>
      <select
        value={statusFilter}
        onChange={(e) =>
          setSearchParams(e.target.value ? { status: e.target.value } : {})
        }
        className="mb-6 px-4 py-2 border rounded-lg"
      >
        <option value="">All Orders</option>
        <option value="pending">Pending</option>
        <option value="preparing">Preparing</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      {orders.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">No Orders Found</h2>
          <p className="text-gray-600">Users haven't placed any orders yet.</p>
        </div>
      )}
      {orders.length !== 0 && (
        <div className=" min-h-screen bg-light py-12">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-dark mb-8">
              📦 User Orders
            </h1>
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-card p-6 animate-fadeIn"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-dark">
                      Order #{order._id.slice(-6)}
                    </h2>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      disabled={updatingStatusId === order._id}
                      className={`px-3 py-1 rounded-full font-medium border ${
                        statusColors[order.status] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">preparing</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <p className="text-gray-600 mb-2">
                    <strong>User:</strong> {order.user.name} ({order.user.email}
                    )
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Delivery Address:</strong> {order.address.street},{" "}
                    {order.address.city}, 📱 {order.address.phone}
                  </p>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.food._id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.food.image}
                            alt={item.food.name}
                            className="w-12 h-12 object-cover rounded-lg"
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/48?text=Food")
                            }
                          />
                          <span className="font-medium text-dark">
                            {item.food.name} x {item.quantity}
                          </span>
                        </div>
                        <span className="font-bold text-dark">
                          ${(item.food.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-primary">
                      $
                      {(
                        order.items.reduce(
                          (sum, item) => sum + item.food.price * item.quantity,
                          0,
                        ) +
                        2.99 +
                        order.items.reduce(
                          (sum, item) => sum + item.food.price * item.quantity,
                          0,
                        ) *
                          0.1
                      ).toFixed(2)}
                    </span>
                  </div>
                  {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                cancel
              </button> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
