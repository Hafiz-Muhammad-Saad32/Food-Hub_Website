import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-20 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-primary mb-4 block">
              🍽️ FoodHub
            </Link>
            <p className="text-gray-300">
              Delivering delicious food to your doorstep, fresh and hot, every time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">📞 (555) 123-4567</li>
              <li className="text-gray-300">📧 support@foodhub.com</li>
              <li className="text-gray-300">📍 123 Main St, City, Country</li>
              <li className="text-gray-300">⏰ Open 24/7</li>
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex justify-between items-center flex-col md:flex-row gap-4">
            <div>
              <p className="text-gray-300">
                © {currentYear} FoodHub. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition-colors duration-300 text-xl"
              >
                f
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition-colors duration-300 text-xl"
              >
                𝕏
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition-colors duration-300 text-xl"
              >
                📷
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition-colors duration-300 text-xl"
              >
                in
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
