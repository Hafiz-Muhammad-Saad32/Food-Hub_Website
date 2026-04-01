import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import AdminRoute from "./auth/AdminRoute";
import { useToast } from "./context/ToastContext";

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

// Cart & Admin
import Cart from "./cart/Cart";
import FoodForm from "./admin/FoodForm";
import AdminLogin from "./auth/AdminLogin";
import ProtectedRoute from "./auth/ProtectedRoute";
import OrderPage from "./pages/OrderPage";
import AdminNavbar from "./admin/AdminNavbar";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {
  const showToast = useToast();
  window.addEventListener("beforeunload", () => {
    localStorage.clear(); // 🔥 clears everything
  });

  const navigate = useNavigate();
  // Global state for cart items and foods (backend-ready)
  const [cartItems, setCartItems] = useState([]);
  const [foods, setFoods] = useState([]);

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
    showToast(`Welcome back, Great to see you again!`, "success");
  };

  // console.log(user);

  const handleLogout = () => {
    // Clear auth info
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setCartItems([]);
    setUser(null);
    navigate("/");
    showToast("Logged out successfully. See you soon!", "success");
  };

  // Function to add item to cart
  const addToCart = (food) => {
    const existingItem = cartItems.find((item) => item.id === food.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  // Function to remove item from cart
  const removeFromCart = (foodId) => {
    setCartItems(cartItems.filter((item) => item.id !== foodId));
  };

  // Function to update item quantity in cart
  const updateCartQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === foodId ? { ...item, quantity } : item,
      ),
    );
  };

  // Function to clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-light">
      {user?.role === "admin" ? (
        <AdminNavbar user={user} handleLogout={handleLogout} />
      ) : (
        <Navbar
          cartCount={cartItems.length}
          user={user}
          handleLogout={handleLogout}
        />
      )}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<Home addToCart={addToCart} user={user} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />


          {/* Auth Routes */}
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/verify-email/:token" element={<VerifyEmailPage/>} />
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
                <Cart
                  foods={foods}
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  updateCartQuantity={updateCartQuantity}
                  clearCart={clearCart}
                />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/foods"
            element={
              <ProtectedRoute>
                <FoodForm foods={foods} setFoods={setFoods} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={<AdminLogin handleLogin={handleLogin} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
