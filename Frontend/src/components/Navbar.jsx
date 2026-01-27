import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-card sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary hover:text-secondary transition-colors duration-300"
          >
            🍽️ FoodHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link
              to="/"
              className="text-dark font-medium hover:text-primary transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-dark font-medium hover:text-primary transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-dark font-medium hover:text-primary transition-colors duration-300"
            >
              Contact
            </Link>
            <Link
              to="/admin/foods"
              className="text-dark font-medium hover:text-primary transition-colors duration-300"
            >
              Admin
            </Link>
          </div>

          {/* Right Side Items */}
          <div className="hidden md:flex gap-4 items-center">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative bg-primary text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            <Link
              to="/login"
              className="text-dark font-medium hover:text-primary transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn-primary"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 animate-slideDown">
            <Link
              to="/"
              className="text-dark font-medium hover:text-primary transition-colors duration-300 block"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-dark font-medium hover:text-primary transition-colors duration-300 block"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-dark font-medium hover:text-primary transition-colors duration-300 block"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/admin/foods"
              className="text-dark font-medium hover:text-primary transition-colors duration-300 block"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
            <Link
              to="/cart"
              className="bg-primary text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg block text-center"
              onClick={() => setIsOpen(false)}
            >
              🛒 Cart ({cartCount})
            </Link>
            <Link
              to="/login"
              className="text-dark font-medium hover:text-primary transition-colors duration-300 block"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn-primary text-center"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
