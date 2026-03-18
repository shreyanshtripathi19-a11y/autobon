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

      // Configure Chatra — small icon button, no "Message" text
      window.ChatraSetup = {
        colors: {
          buttonText: "#ffffff",
          buttonBg: "#1a6adb",
        },
        chatTitle: "Autobon Support",
        chatSubtitle: "We typically reply within minutes",
        buttonSize: 50,
        buttonStyle: "round",
      };

      // After script loads, hide the default launcher text via CSS
      const style = document.createElement("style");
      style.textContent = `
        #chatra:not(.chatra--expanded) .chatra--pos-right {
          width: 50px !important;
          height: 50px !important;
        }
        #chatra:not(.chatra--expanded) .chatra--btn-text {
          display: none !important;
        }
        #chatra:not(.chatra--expanded) .chatra--btn {
          width: 50px !important;
          height: 50px !important;
          border-radius: 50% !important;
        }
      `;
      document.head.appendChild(style);

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
