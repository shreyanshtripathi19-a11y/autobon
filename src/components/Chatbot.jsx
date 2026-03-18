"use client";

import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // ─── Chatra Setup: brand colors, custom button, working hours ───
    window.ChatraSetup = {
      // Use our custom button instead of default Chatra button
      startHidden: true,
      
      // Brand colors
      colors: {
        buttonText: '#ffffff',
        buttonBg: '#1a6adb',
      },

      // Working hours + branding in chat title
      locale: {
        chat: {
          headerTitle: 'Autobon Support',
          headerSubTitle: '🕐 Hours: 9 AM – 9 PM | We typically reply instantly',
          input: {
            placeholder: 'Type your message...',
          },
        },
        welcomeMessage: {
          auto: "👋 Welcome to Autobon! How can we help you today? We're available Mon-Sun, 9 AM – 9 PM.",
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

    // ─── Custom CSS: brand logo, hide Chatra branding, Autobon icon ───
    const style = document.createElement('style');
    style.id = 'autobon-chatra-css';
    style.textContent = `
      /* ── Custom floating button (replaces Chatra default) ── */
      #autobon-chat-trigger {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 99998;
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
      #autobon-chat-trigger img {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        object-fit: contain;
        background: white;
        padding: 3px;
      }

      /* ── Ensure Chatra's own button is always hidden ── */
      #chatra:not(.chatra--expanded) .chatra--btn,
      .chatra--btn-frame {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
        width: 0 !important;
        height: 0 !important;
      }

      /* ── Hide "Powered by Chatra" / "We run on Chatra" branding ── */
      .chatra--brandWrap,
      .chatra--brand,
      .chatra--brand-container,
      .chatra--poweredBy,
      #chatra .chatra--footer-brand,
      #chatra a[href*="chatra.io"],
      #chatra a[href*="chatra.com"],
      div[class*="brand"],
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

      /* ── Custom header colors ── */
      #chatra .chatra--header,
      .chatra--header-wrapper {
        background: linear-gradient(135deg, #1a6adb 0%, #1558b4 100%) !important;
      }

      /* ── Add Autobon logo to header ── */
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

    // ─── Create custom chat trigger button ───
    const btn = document.createElement('button');
    btn.id = 'autobon-chat-trigger';
    btn.setAttribute('aria-label', 'Chat with Autobon');
    btn.innerHTML = '<img src="/logo.png" alt="Autobon" />';
    btn.addEventListener('click', () => {
      if (window.Chatra) {
        window.Chatra('openChat', true);
      }
    });
    document.body.appendChild(btn);

    // Once Chatra loads, make sure its default button stays hidden
    script.onload = () => {
      // Small delay to let Chatra initialize
      setTimeout(() => {
        if (window.Chatra) {
          window.Chatra('hide');
        }
      }, 500);
    };

    return () => {
      // Cleanup
      const existingBtn = document.getElementById('autobon-chat-trigger');
      if (existingBtn) existingBtn.remove();
      const existingStyle = document.getElementById('autobon-chatra-css');
      if (existingStyle) existingStyle.remove();
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return null; // Chatra + custom button render via DOM
};

export default Chatbot;
