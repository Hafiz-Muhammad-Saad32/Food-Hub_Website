import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // TODO: BACKEND API CALL HERE
    // Example: const response = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password })
    // });

    // Simulate API delay
    setTimeout(() => {
      console.log("Login attempt:", { email, password });
      // After successful login, save token and redirect
      localStorage.setItem("authToken", "dummy_token_12345");
      localStorage.setItem("userEmail", email);
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">🍽️</h1>
          <h2 className="text-3xl font-bold text-dark">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`input-field ${
                errors.email ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`input-field ${
                errors.password ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-secondary transition-colors duration-300 font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border-2 border-gray-200 rounded-lg py-2 hover:border-primary transition-colors duration-300"
          >
            <span>G</span>
            <span className="text-sm font-medium">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 border-2 border-gray-200 rounded-lg py-2 hover:border-primary transition-colors duration-300"
          >
            <span>f</span>
            <span className="text-sm font-medium">Facebook</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-bold hover:text-secondary transition-colors duration-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
