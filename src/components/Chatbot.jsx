"use client";

import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Configure Chatra with brand customization
    window.ChatraSetup = {
      buttonStyle: 'round',
      buttonSize: 60,
      chatWidth: 380,
      chatHeight: 550,
      colors: {
        buttonText: '#ffffff',
        buttonBg: '#4079ED',       // Autobon brand blue
        clientBubbleBg: '#e8effd', // Light blue for client messages
        agentBubbleBg: '#f3f4f6',  // Light gray for agent messages
      },
      locale: {
        chat: {
          input: {
            placeholder: 'Type your message...',
          },
        },
        offlineForm: {
          heading: 'Leave us a message',
        },
        name: 'Name',
        yourName: 'Your name',
      },
    };

    // Integration info
    window.ChatraIntegration = {
      name: '',
      email: '',
      phone: '',
    };

    // Load Chatra script
    window.ChatraID = 'FYh7ktXrXWzTGDxHF';
    const s = document.createElement('script');
    window.Chatra = window.Chatra || function() {
      (window.Chatra.q = window.Chatra.q || []).push(arguments);
    };
    s.async = true;
    s.src = 'https://call.chatra.io/chatra.js';
    if (document.head) document.head.appendChild(s);

    // Custom CSS to override Chatra button with Autobon branding
    const style = document.createElement('style');
    style.textContent = `
      /* Override Chatra button icon with Autobon logo */
      #chatra:not(.chatra--expanded) .chatra--pos-right .chatra--icon-default,
      #chatra .chatra--icon-default {
        background-image: url('/logo.png') !important;
        background-size: 34px 34px !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
      }
      #chatra .chatra--icon-default svg {
        display: none !important;
      }

      /* Brand blue for the round button */
      #chatra .chatra--btn {
        background-color: #4079ED !important;
      }

      /* Hide "Chat by Chatra" branding */
      .chatra--brandWrap,
      .chatra--brand,
      a[href*="chatra.com"],
      .chatra--footer-brand,
      #chatra .chatra--brand-container,
      #chatra a[href*="chatra"],
      .chatra--poweredBy {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        overflow: hidden !important;
        opacity: 0 !important;
      }

      /* Add Autobon logo to chat header area */
      #chatra .chatra--header {
        position: relative;
      }
      #chatra .chatra--header::before {
        content: '';
        display: inline-block;
        width: 28px;
        height: 28px;
        background-image: url('/logo.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-right: 8px;
        vertical-align: middle;
      }
      
      /* Custom header styling */
      #chatra .chatra--header-text {
        color: white !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup
      if (s.parentNode) s.parentNode.removeChild(s);
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  return null; // Chatra renders its own UI
};

export default Chatbot;
