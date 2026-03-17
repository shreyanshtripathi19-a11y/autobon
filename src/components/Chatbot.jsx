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
