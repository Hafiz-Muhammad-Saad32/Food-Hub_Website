import { Link } from "react-router-dom";
import { useState } from "react";

export default function Cart({
  cartItems,
  removeFromCart,
  updateCartQuantity,
  clearCart,
}) {
  const [showOrderForm, setShowOrderForm] = useState(false);

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

        {/* Cart Content */}
        {!showOrderForm ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-card p-6 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 mb-6 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0 animate-fadeIn"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-dark mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {item.description}
                      </p>
                      <p className="text-primary font-bold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex flex-col justify-between items-end">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-300 font-medium"
                      >
                        ✕
                      </button>
                      <div className="flex items-center gap-3 border-2 border-gray-200 rounded-lg px-3 py-1">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity - 1)
                          }
                          className="text-lg font-bold text-primary hover:text-secondary transition-colors duration-300"
                        >
                          −
                        </button>
                        <span className="font-bold text-dark w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
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
            </div>

            {/* Order Summary */}
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
                  onClick={() => setShowOrderForm(true)}
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
            totalPrice={totalPrice}
            totalItems={totalItems}
            onBackToCart={() => setShowOrderForm(false)}
          />
        )}
      </div>
    </div>
  );
}

// Order Form Component
function OrderForm({ totalPrice, totalItems, onBackToCart }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "card",
    specialInstructions: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // TODO: BACKEND API CALL HERE
    // Example: const response = await fetch("/api/orders", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData)
    // });

    // Simulate API delay
    setTimeout(() => {
      console.log("Order placed:", formData);
      setOrderPlaced(true);
      setLoading(false);
    }, 2000);
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
              <strong>Order ID:</strong> #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Total Items:</strong> {totalItems}
            </p>
            <p className="text-lg font-bold text-primary">
              <strong>Total:</strong> ${(totalPrice + 2.99 + totalPrice * 0.1).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Delivery Address:</strong> {formData.address}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full btn-primary"
            >
              Back to Home
            </button>
            <button
              onClick={() => (window.location.href = "/cart")}
              className="w-full btn-outline"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-card p-8">
        <h2 className="text-2xl font-bold text-dark mb-8">📦 Delivery Details</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`input-field ${
                errors.name ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className={`input-field ${
                errors.phone ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Delivery Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, Apt 4B, City, Country 12345"
              rows={3}
              className={`input-field resize-none ${
                errors.address ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="input-field"
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
              className="input-field resize-none"
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
