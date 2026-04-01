import { useEffect, useState } from "react";
import { orderAPI } from "../services/api";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getUserOrders(); // API should return all orders of logged-in user
        setOrders(response.data.data || []);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch your orders!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven’t placed any orders yet.
        </p>
        <Link to="/" className="btn-primary">
          Start Ordering
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-dark mb-6">🛒 My Orders</h1>

        {orders.map((order) => {
          const subtotal = order.items.reduce(
            (sum, item) => sum + item.food.price * item.quantity,
            0,
          );
          const deliveryFee = 2.99;
          const tax = subtotal * 0.1;
          const total = subtotal + deliveryFee + tax;

          return (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-card p-6 animate-fadeIn"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="font-bold text-dark">
                  Order ID: #{order._id.slice(-9)}
                </p>
                <p
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "preparing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status.toUpperCase()}
                </p>
              </div>

              {/* Items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <div
                    key={item.food._id}
                    className="flex justify-between items-center border-b border-gray-200 pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.food.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} × ${item.food.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold">
                      ${(item.food.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-1 border-t border-gray-200 pt-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-dark">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mt-4 text-gray-700">
                <p className="font-medium">Delivery To:</p>
                <p>
                  {order.address.street}, {order.address.city}
                </p>
                <p>📱 {order.address.phone}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
