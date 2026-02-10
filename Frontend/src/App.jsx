import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminRoute from "./auth/AdminRoute";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Auth Pages
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import { cartAPI } from "./services/api";

// Cart & Admin
import Cart from "./cart/Cart";
import FoodForm from "./admin/FoodForm";
import AdminLogin from "./auth/AdminLogin";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  window.addEventListener("beforeunload", () => {
    localStorage.clear(); // 🔥 clears everything
  });

  const navigate = useNavigate();
  // Global state for cart items and foods (backend-ready)
  const [cartItems, setCartItems] = useState([]);
  const [foods, setFoods] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // const [user, setUser] = useState(() => {
  //   try {
  //     const storedUser = localStorage.getItem("user");
  //     return storedUser ? JSON.parse(storedUser) : null;
  //   } catch (error) {
  //     console.error("Failed to parse user from localStorage:", error);
  //     return null;
  //   }
  // });
  const [user, setUser] = useState();

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    // Clear auth info
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setCartItems([]);
    setCartCount(0);
    setUser(null);
    navigate("/");
  };

  const refreshCartCount = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setCartCount(0);
      return;
    }
    try {
      const response = await cartAPI.getCart();
      const items = response?.data?.data?.items || [];
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (err) {
      console.error("Failed to refresh cart count:", err);
    }
  };

  useEffect(() => {
    refreshCartCount();
  }, [user]);

  // Function to add item to cart
  const addToCart = (food) => {
    const existingItem = cartItems.find((item) => item._id === food._id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  // Function to remove item from cart
  const removeFromCart = (foodId) => {
    setCartItems(cartItems.filter((item) => item._id !== foodId));
  };

  // Function to update item quantity in cart
  const updateCartQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item._id === foodId ? { ...item, quantity } : item,
      ),
    );
  };

  // Function to clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-light">
      <Navbar
        cartCount={cartCount}
        user={user}
        handleLogout={handleLogout}
      />

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<Home onCartChanged={refreshCartCount} user={user} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Signup handleLogin={handleLogin} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Cart Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/foods"
            element={
              <AdminRoute>
                <FoodForm foods={foods} setFoods={setFoods} />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
