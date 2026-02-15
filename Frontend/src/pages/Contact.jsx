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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid format";
    }
    if (!formData.message.trim()) newErrors.message = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setLoading(false);
      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. Header Section (Compact) */}
      <section className="py-12 border-b border-slate-50 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-xs bg-orange-50 px-3 py-1 rounded-full">
            Help Center
          </span>
          <h1 className="text-4xl font-black mt-4 mb-3 tracking-tight">
            Contact <span className="text-orange-500">Us.</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Have a question? We're here to help you 24/7.
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Contact Info (Left Side) */}
            <div className="md:col-span-5 space-y-4">
              <h2 className="text-2xl font-black italic mb-6">Get In Touch</h2>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: "📧", label: "Email", val: "support@foodhub.com" },
                  { icon: "📞", label: "Phone", val: "+1 (555) 123-4567" },
                  { icon: "📍", label: "Office", val: "123 Main St, City" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {item.val}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="pt-4 flex gap-3">
                {["f", "𝕏", "📷", "in"].map((s, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Form (Right Side) */}
            <div className="md:col-span-7">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                {success && (
                  <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-xl text-sm font-bold border border-green-100 animate-pulse">
                    ✓ Message sent successfully!
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-xs font-black uppercase text-slate-400 ml-1">
                      Name
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="text-xs font-black uppercase text-slate-400 ml-1">
                      Email
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      placeholder="you@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs font-black uppercase text-slate-400 ml-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
                      placeholder="How can we help?"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    disabled={loading}
                    className="col-span-2 bg-orange-500 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ Section (Tighter) */}
      <section className="py-12 bg-slate-50 rounded-[2rem] mx-4">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-center text-2xl font-black mb-8 italic">FAQs</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { q: "Delivery hours?", a: "24/7 service always." },
              { q: "Payment methods?", a: "Cards, Wallets, Cash." },
              { q: "Speed?", a: "Usually 30-45 mins." },
              { q: "Support?", a: "Live chat available." },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-slate-200/50"
              >
                <h4 className="font-bold text-sm mb-1">{faq.q}</h4>
                <p className="text-slate-500 text-xs">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
