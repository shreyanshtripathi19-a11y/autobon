"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !e.target.closest("#autobon-chat-btn")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          source: "chatbot",
        }),
      });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        id="autobon-chat-btn"
        onClick={() => {
          setIsOpen(!isOpen);
          if (submitted) resetChat();
        }}
        className="fixed bottom-5 right-5 z-[9999] w-[56px] h-[56px] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        style={{
          background: "linear-gradient(135deg, #E31837 0%, #c41230 100%)",
          boxShadow: "0 4px 20px rgba(227, 24, 55, 0.4)",
        }}
        aria-label="Chat with Autobon"
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
            <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-[80px] right-5 z-[9999] w-[360px] max-w-[calc(100vw-40px)] rounded-2xl overflow-hidden shadow-2xl"
          style={{
            animation: "chatSlideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
          }}
        >
          <style>{`
            @keyframes chatSlideUp {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* Header */}
          <div
            className="px-5 py-4 flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, #E31837 0%, #b8102c 100%)",
            }}
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Autobon"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-[15px] leading-tight">
                Autobon Support
              </h3>
              <p className="text-white/80 text-[11px] mt-0.5">
                We typically reply within minutes
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Working Hours Bar */}
          <div className="bg-[#1a1a1a] px-5 py-2.5 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E31837" strokeWidth="2" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <span className="text-white/90 text-[12px] font-medium">
              Working Hours: <span className="text-[#E31837] font-bold">9:00 AM – 9:00 PM</span>
            </span>
          </div>

          {/* Body */}
          <div className="bg-white">
            {submitted ? (
              /* Success State */
              <div className="px-6 py-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </div>
                <h4 className="text-[18px] font-bold text-gray-900 mb-2">
                  Message Sent!
                </h4>
                <p className="text-sm text-gray-500 mb-6">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button
                  onClick={resetChat}
                  className="px-6 py-2.5 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #E31837 0%, #b8102c 100%)" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3">
                <div className="bg-gray-50 rounded-xl p-3 mb-1">
                  <p className="text-[13px] text-gray-700">
                    👋 Hi there! How can we help you today? Fill out the form below and we&apos;ll get back to you.
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    required
                    className="w-full px-3.5 py-2.5 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all bg-white"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    required
                    className="w-full px-3.5 py-2.5 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all bg-white"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-3.5 py-2.5 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all bg-white"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message *"
                    required
                    rows={3}
                    className="w-full px-3.5 py-2.5 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !form.name || !form.email || !form.message}
                  className="w-full py-3 text-[14px] font-bold text-white rounded-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #E31837 0%, #b8102c 100%)" }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E31837">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </svg>
                <a href="tel:905-800-3100" className="text-[11px] font-semibold text-gray-600 hover:text-[#E31837] transition-colors">
                  905-800-3100
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Image
                  src="/logo.png"
                  alt="Autobon"
                  width={16}
                  height={16}
                  className="object-contain opacity-50"
                />
                <span className="text-[10px] text-gray-400">Powered by Autobon</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
