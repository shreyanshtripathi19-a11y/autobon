"use client";

import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Load Chatra chat widget
    if (typeof window !== "undefined" && !window.ChatraID) {
      window.ChatraID = "FYh7ktXrXWzTGDxHF";
      window.Chatra = window.Chatra || function () {
        (window.Chatra.q = window.Chatra.q || []).push(arguments);
      };

      // Configure Chatra with logo
      window.ChatraSetup = {
        colors: {
          buttonText: "#ffffff",
          buttonBg: "#1a6adb",
        },
        chatTitle: "Autobon Support",
        chatSubtitle: "We typically reply within minutes",
      };

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://call.chatra.io/chatra.js";
      document.head.appendChild(script);
    }
  }, []);

  // Chatra renders its own widget — no need for custom UI
  return null;
};

export default Chatbot;
