"use client";

import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Prevent duplicate initialization
    if (document.getElementById('autobon-chat-trigger')) return;

    // ─── Chatra Setup ───
    window.ChatraSetup = {
      // Use our custom button — this hides Chatra's default button
      // but keeps the chat panel fully functional
      customWidgetButton: '#autobon-chat-trigger',

      // Brand colors
      colors: {
        buttonText: '#ffffff',
        buttonBg: '#1a6adb',
      },

      // Working hours + branding
      locale: {
        chat: {
          headerTitle: 'Autobon Support',
          headerSubTitle: '🕐 Hours: 9 AM – 9 PM | We typically reply instantly',
          input: {
            placeholder: 'Type your message...',
          },
        },
      },
    };

    // ─── Load Chatra Script ───
    window.ChatraID = 'FYh7ktXrXWzTGDxHF';
    window.Chatra = window.Chatra || function () {
      (window.Chatra.q = window.Chatra.q || []).push(arguments);
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://call.chatra.io/chatra.js';
    document.head.appendChild(script);

    // ─── Custom CSS ───
    const style = document.createElement('style');
    style.id = 'autobon-chatra-css';
    style.textContent = `
      /* ── Custom floating button ── */
      #autobon-chat-trigger {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 90;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1a6adb 0%, #1558b4 100%);
        box-shadow: 0 4px 20px rgba(26, 106, 219, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        padding: 0;
      }
      #autobon-chat-trigger:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 28px rgba(26, 106, 219, 0.55);
      }
      /* Chat icon SVG styling */
      #autobon-chat-trigger svg {
        width: 28px;
        height: 28px;
      }

      /* ── Hide "Powered by Chatra" / "We run on Chatra" branding ── */
      .chatra--brandWrap,
      .chatra--brand,
      .chatra--brand-container,
      .chatra--poweredBy,
      #chatra .chatra--footer-brand,
      #chatra a[href*="chatra.io"],
      #chatra a[href*="chatra.com"],
      .chatra--footer a[href*="chatra"] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        max-height: 0 !important;
        overflow: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      /* ── Brand blue header ── */
      #chatra .chatra--header,
      .chatra--header-wrapper {
        background: linear-gradient(135deg, #1a6adb 0%, #1558b4 100%) !important;
      }

      /* ── Autobon logo in chat header ── */
      #chatra .chatra--header-agents::before {
        content: '';
        display: block;
        width: 36px;
        height: 36px;
        background-image: url('/logo.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 50%;
        background-color: white;
        margin-right: 8px;
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(style);

    // ─── Create custom chat trigger button with chat icon (not logo) ───
    const btn = document.createElement('button');
    btn.id = 'autobon-chat-trigger';
    btn.setAttribute('aria-label', 'Chat with Autobon');
    // Clean chat bubble SVG icon
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
      <circle cx="8" cy="10" r="1.2" fill="#1a6adb"/>
      <circle cx="12" cy="10" r="1.2" fill="#1a6adb"/>
      <circle cx="16" cy="10" r="1.2" fill="#1a6adb"/>
    </svg>`;
    document.body.appendChild(btn);

    return () => {
      const existingBtn = document.getElementById('autobon-chat-trigger');
      if (existingBtn) existingBtn.remove();
      const existingStyle = document.getElementById('autobon-chatra-css');
      if (existingStyle) existingStyle.remove();
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return null;
};

export default Chatbot;
