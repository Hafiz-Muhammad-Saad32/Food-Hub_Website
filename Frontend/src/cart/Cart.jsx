import { Link } from "react-router-dom";
import { useState } from "react";
import AddressManager from "../components/AddressManager";
import { orderAPI } from "../services/api";

export default function Cart({
  cartItems,
  removeFromCart,
  updateCartQuantity,
  clearCart,
}) {
  const [showAddressManager, setShowAddressManager] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddressDetails, setSelectedAddressDetails] = useState(null);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate total items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0 && !showOrderForm) {
    return (
      <div className="min-h-screen bg-light py-16">
        <div className="container-custom text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h1 className="text-4xl font-bold text-dark mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 text-lg mb-8">
            Looks like you haven't added anything to your cart yet. Start
            exploring our menu!
          </p>
          <Link to="/" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleProceedToOrder = () => {
    if (!selectedAddressId) {
      alert("❌ Please select or add a delivery address first!");
      return;
    }
    setShowOrderForm(true);
    setShowAddressManager(false);
  };

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-dark mb-2">🛒 Your Cart</h1>
          <p className="text-gray-600">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        {/* Main Cart View */}
        {!showOrderForm ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items Section */}
              <div className="bg-white rounded-xl shadow-card p-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-6 mb-6 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0 animate-fadeIn"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/96?text=Food";
                        }}
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-dark mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-primary font-bold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex flex-col justify-between items-end">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-300 font-medium text-lg"
                      >
                        ✕
                      </button>
                      <div className="flex items-center gap-3 border-2 border-gray-200 rounded-lg px-3 py-1">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateCartQuantity(item._id, item.quantity - 1);
                            }
                          }}
                          className="text-lg font-bold text-primary hover:text-secondary transition-colors duration-300"
                        >
                          −
                        </button>
                        <span className="font-bold text-dark w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item._id, item.quantity + 1)
                          }
                          className="text-lg font-bold text-primary hover:text-secondary transition-colors duration-300"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-bold text-dark">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h3 className="font-bold text-dark mb-4">Apply Coupon</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code (e.g., FOODHUB20)"
                    className="flex-grow input-field"
                  />
                  <button className="btn-primary">Apply</button>
                </div>
              </div>

              {/* Address Selection Section */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-dark">📍 Delivery Address</h3>
                  <button
                    onClick={() => setShowAddressManager(!showAddressManager)}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    {showAddressManager ? "Hide" : "+ Add Address"}
                  </button>
                </div>

                {/* Address Manager Form */}
                {showAddressManager && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <AddressManager
                      onAddressSelect={(id, details) => {
                        setSelectedAddressId(id);
                        setSelectedAddressDetails(details);
                      }}
                      selectedAddressId={selectedAddressId}
                    />
                  </div>
                )}

                {/* Selected Address Display */}
                {selectedAddressDetails && (
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>✅ Selected Address:</strong>
                    </p>
                    <p className="text-dark font-medium">
                      {selectedAddressDetails.street}, {selectedAddressDetails.city}
                    </p>
                    <p className="text-gray-600 text-sm">
                      📱 {selectedAddressDetails.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-card p-6 sticky top-24">
                <h3 className="text-xl font-bold text-dark mb-6">
                  Order Summary
                </h3>

                {/* Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-bold text-dark">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee:</span>
                    <span className="font-bold text-dark">$2.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (10%):</span>
                    <span className="font-bold text-dark">
                      ${(totalPrice * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-dark">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    ${(totalPrice + 2.99 + totalPrice * 0.1).toFixed(2)}
                  </span>
                </div>

                {/* Buttons */}
                <button
                  onClick={handleProceedToOrder}
                  className="w-full btn-primary mb-3"
                >
                  Proceed to Order
                </button>
                <button
                  onClick={() => clearCart()}
                  className="w-full btn-outline"
                >
                  Clear Cart
                </button>

                {/* Continue Shopping */}
                <Link
                  to="/"
                  className="block mt-4 text-center text-primary hover:text-secondary transition-colors duration-300 font-medium"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // Order Form
          <OrderForm
            cartItems={cartItems}
            totalPrice={totalPrice}
            totalItems={totalItems}
            selectedAddressId={selectedAddressId}
            selectedAddressDetails={selectedAddressDetails}
            onBackToCart={() => setShowOrderForm(false)}
            clearCart={clearCart}
          />
        )}
      </div>
    </div>
  );
}

// Order Form Component
function OrderForm({
  cartItems,
  totalPrice,
  totalItems,
  selectedAddressId,
  selectedAddressDetails,
  onBackToCart,
  clearCart,
}) {
  const [formData, setFormData] = useState({
    paymentMethod: "card",
    specialInstructions: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAddressId) {
      alert("❌ Error: No address selected! Please go back and select an address.");
      return;
    }

    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        items: cartItems.map((item) => ({
          food: item._id,
          quantity: item.quantity,
        })),
        address: selectedAddressId,
        paymentMethod: formData.paymentMethod,
        specialInstructions: formData.specialInstructions,
      };

      // Call backend API
      const response = await orderAPI.createOrder(orderData);
      setOrderId(response.data.data._id);
      setOrderPlaced(true);
      clearCart();
      alert("✅ Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to place order. Please try again.";
      alert(`❌ Error: ${errorMessage}`);
      setErrors({
        submit: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-card p-12 text-center animate-fadeIn">
          <div className="text-8xl mb-6">✅</div>
          <h2 className="text-4xl font-bold text-dark mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Thank you for your order. Your food will be delivered within 30-45
            minutes.
          </p>

          <div className="bg-gray-100 rounded-lg p-6 text-left mb-8">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Order ID:</strong> #{orderId?.slice(-9)}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Delivery Address:</strong> {selectedAddressDetails?.street},{" "}
              {selectedAddressDetails?.city}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Total Items:</strong> {totalItems}
            </p>
            <p className="text-lg font-bold text-primary">
              <strong>Total:</strong> ${(totalPrice + 2.99 + totalPrice * 0.1).toFixed(2)}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full btn-primary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-card p-8">
        <h2 className="text-2xl font-bold text-dark mb-8">📦 Complete Your Order</h2>

        {errors.submit && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            ❌ {errors.submit}
          </div>
        )}

        {/* Selected Address Info */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">
            <strong>📍 Delivery To:</strong>
          </p>
          <p className="text-dark font-medium">
            {selectedAddressDetails?.street}, {selectedAddressDetails?.city}
          </p>
          <p className="text-gray-600 text-sm">
            📱 {selectedAddressDetails?.phone}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="input-field w-full"
            >
              <option value="card">💳 Credit/Debit Card</option>
              <option value="wallet">💰 Digital Wallet</option>
              <option value="upi">📱 UPI</option>
              <option value="cash">💵 Cash on Delivery</option>
            </select>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              placeholder="e.g., Extra spicy, no onions, etc."
              rows={3}
              className="input-field resize-none w-full"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 rounded-lg p-4 border-2 border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Delivery Fee:</span>
              <span className="font-bold">$2.99</span>
            </div>
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-300">
              <span className="text-gray-600">Tax (10%):</span>
              <span className="font-bold">${(totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-bold text-dark">Total:</span>
              <span className="font-bold text-primary">
                ${(totalPrice + 2.99 + totalPrice * 0.1).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBackToCart}
              className="flex-1 btn-outline"
            >
              Back to Cart
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}