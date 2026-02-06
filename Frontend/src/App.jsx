import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

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
import AdminLogin from "./auth/adminLogin";

function App() {
  // Global state for cart items and foods (backend-ready)
  const [cartItems, setCartItems] = useState([]);
  const [foods, setFoods] = useState([]);

  // Function to add item to cart
  const addToCart = (food) => {
    const existingItem = cartItems.find((item) => item.id === food.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
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
        item.id === foodId ? { ...item, quantity } : item
      )
    );
  };

  // Function to clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-light">
        <Navbar cartCount={cartItems.length} />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={<Home addToCart={addToCart} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Cart Routes */}
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  updateCartQuantity={updateCartQuantity}
                  clearCart={clearCart}
                />
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/foods"
              element={
                <FoodForm
                  foods={foods}
                  setFoods={setFoods}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

