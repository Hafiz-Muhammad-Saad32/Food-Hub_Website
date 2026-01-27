import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
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
    // Example: const response = await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData)
    // });

    // Simulate API delay
    setTimeout(() => {
      console.log("Contact form submitted:", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setLoading(false);
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl opacity-90">
            Get in touch with our team. We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-dark mb-8">
                Get In Touch
              </h2>

              {/* Email */}
              <div className="card p-6 mb-6">
                <div className="flex gap-4">
                  <div className="text-3xl">📧</div>
                  <div>
                    <h3 className="text-lg font-bold text-dark">Email</h3>
                    <a
                      href="mailto:support@foodhub.com"
                      className="text-primary hover:text-secondary transition-colors duration-300"
                    >
                      support@foodhub.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="card p-6 mb-6">
                <div className="flex gap-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h3 className="text-lg font-bold text-dark">Phone</h3>
                    <a
                      href="tel:+1234567890"
                      className="text-primary hover:text-secondary transition-colors duration-300"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="card p-6 mb-6">
                <div className="flex gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h3 className="text-lg font-bold text-dark">Address</h3>
                    <p className="text-gray-600">
                      123 Main Street<br />
                      Your City, Country 12345
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="card p-6">
                <div className="flex gap-4">
                  <div className="text-3xl">🕐</div>
                  <div>
                    <h3 className="text-lg font-bold text-dark">Hours</h3>
                    <p className="text-gray-600">
                      Monday - Sunday<br />
                      Open 24/7
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-dark mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl hover:shadow-lg transition-all duration-300"
                  >
                    f
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl hover:shadow-lg transition-all duration-300"
                  >
                    𝕏
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl hover:shadow-lg transition-all duration-300"
                  >
                    📷
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl hover:shadow-lg transition-all duration-300"
                  >
                    in
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-dark mb-6">
                  Send us a Message
                </h2>

                {success && (
                  <div className="mb-6 bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded-lg animate-slideDown">
                    ✓ Thank you! We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Full Name
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

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`input-field ${
                        errors.email ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Phone Number
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

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g., Feedback, Partnership, Support"
                      className={`input-field ${
                        errors.subject ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      rows={4}
                      className={`input-field resize-none ${
                        errors.message ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-dark text-center mb-8">
            Find Us On Map
          </h2>
          <div className="w-full h-96 bg-gray-200 rounded-xl shadow-card flex items-center justify-center">
            <p className="text-gray-600 text-lg">📍 Map Integration Coming Soon</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "What are your delivery hours?",
                a: "We're open 24/7 and deliver whenever you want!",
              },
              {
                q: "Do you offer group discounts?",
                a: "Yes! Contact us for special bulk order pricing.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, digital wallets, and cash.",
              },
              {
                q: "How quickly do you deliver?",
                a: "Typically within 30-45 minutes depending on your location.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="card p-6">
                <h3 className="font-bold text-dark mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
