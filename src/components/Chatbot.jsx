"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronDown, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [stage, setStage] = useState("initial");
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const chatLogRef = useRef(null);

  const startInitialChatFlow = () => {
    setMessages([
      {
        senderType: "bot",
        text: "Hi there! Welcome to Autobon. What brings you here today? Are you looking to:",
      },
    ]);
    setStage("initial");
  };

  const handleAutoInitChat = async (name, email) => {
    try {
      const response = await fetch("/api/chat/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to auto-initialize chat session");
      }

      const { userId: newUserId } = await response.json();
      setUserId(newUserId);
      sessionStorage.setItem("chatUserId", newUserId);

      setMessages([
        {
          senderType: "bot",
          text: `Hi ${name}! Thanks for logging in. How can we help you today?`,
        },
      ]);
      setStage("chatting");
    } catch (error) {
      console.error(error);
      setMessages([
        {
          senderType: "bot",
          text: "Sorry, something went wrong initializing your chat. Please refresh and try again.",
        },
      ]);
    }
  };

  const fetchHistory = async (currentUserId) => {
    try {
      const response = await fetch(`/api/chat/message?userId=${currentUserId}`);
      if (response.ok) {
        const { messages: history } = await response.json();
        const formattedMessages = history.map((msg) => ({
          text: msg.message,
          from_user_id: msg.from_user_id,
          to_user_id: msg.to_user_id,
          botAccount: msg.botAccount,
          senderType: msg.botAccount
            ? "bot"
            : msg.from_user_id === currentUserId
              ? "user"
              : "agent",
        }));

        setMessages(
          formattedMessages.length > 0
            ? formattedMessages
            : [{ senderType: "bot", text: "Welcome back! How can I help?" }]
        );
      } else {
        setMessages([
          { senderType: "bot", text: "Welcome back! How can I help?" },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch chat history", error);
      setMessages([
        { senderType: "bot", text: "Welcome back! How can I help?" },
      ]);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      const savedUserId = sessionStorage.getItem("chatUserId");
      if (savedUserId) {
        setUserId(savedUserId);
        setStage("chatting");
        fetchHistory(savedUserId);
      } else {
        const userDataString = localStorage.getItem("user");
        if (userDataString) {
          try {
            const userData = JSON.parse(userDataString);
            if (userData && userData.name && userData.email) {
              setUserName(userData.name);
              handleAutoInitChat(userData.name, userData.email);
            } else {
              startInitialChatFlow();
            }
          } catch (error) {
            console.error("Failed to parse user data", error);
            startInitialChatFlow();
          }
        } else {
          startInitialChatFlow();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Polling for new messages
  useEffect(() => {
    if (isOpen && stage === "chatting" && userId) {
      const interval = setInterval(() => fetchHistory(userId), 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen, stage, userId]);

  // Scroll to bottom
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInitialChoice = (choice) => {
    setMessages((prev) => [...prev, { senderType: "user", text: choice }]);
    setMessages((prev) => [
      ...prev,
      {
        senderType: "bot",
        text: "Please let us know your name so we can better assist you.",
      },
    ]);
    setStage("awaiting_name");
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setUserName(inputValue);
    setMessages((prev) => [...prev, { senderType: "user", text: inputValue }]);
    setMessages((prev) => [
      ...prev,
      {
        senderType: "bot",
        text: "What is your email address in case we can't respond right away?",
      },
    ]);
    setInputValue("");
    setStage("awaiting_email");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const email = inputValue;

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessages((prev) => [
        ...prev,
        { senderType: "bot", text: "Please enter a valid email address." },
      ]);
      return;
    }

    setMessages((prev) => [...prev, { senderType: "user", text: email }]);

    try {
      const response = await fetch("/api/chat/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize chat session");
      }

      const { userId: newUserId } = await response.json();
      setUserId(newUserId);
      sessionStorage.setItem("chatUserId", newUserId);

      setMessages((prev) => [
        ...prev,
        {
          senderType: "bot",
          text: "Perfect, thanks! How can we help you today?",
        },
      ]);
      setInputValue("");
      setStage("chatting");
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          senderType: "bot",
          text: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "" || !userId) return;

    const newUserMessage = { senderType: "user", text: inputValue };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    try {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const { reply } = await response.json();
      const botMessage = { senderType: "bot", text: reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        senderType: "bot",
        text: "Sorry, I couldn't send your message. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const getFormSubmitAction = () => {
    if (stage === "awaiting_name") return handleNameSubmit;
    if (stage === "awaiting_email") return handleEmailSubmit;
    return handleSendMessage;
  };

  return (
    <>
      {/* Floating chat button */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
        {/* Chat toggle button */}
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Toggle chat"
        >
          {isOpen ? <ChevronDown size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-28 right-5 w-80 sm:w-96 h-[60vh] max-h-[700px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-3 bg-gray-50 border-b rounded-t-lg">
              <h3 className="font-bold text-lg">Autobon</h3>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={chatLogRef}
              className="flex-1 p-4 overflow-y-auto space-y-4"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-end gap-2",
                    msg.senderType === "user"
                      ? "justify-end"
                      : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 max-w-[80%]",
                      msg.senderType === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}

              {/* Initial choice buttons */}
              {stage === "initial" && (
                <div className="space-y-2 pt-2">
                  {["Sell Car", "Buy Car", "Trade in my car"].map((choice) => (
                    <button
                      key={choice}
                      onClick={() => handleInitialChoice(choice)}
                      className="w-full text-left p-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t p-2 sm:p-4">
              <form
                onSubmit={getFormSubmitAction()}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    stage === "initial"
                      ? "Please select an option"
                      : stage === "awaiting_name"
                        ? "Enter your name..."
                        : stage === "awaiting_email"
                          ? "Enter your email..."
                          : "Type a message..."
                  }
                  disabled={stage === "initial"}
                  className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                />
                <button
                  type="submit"
                  disabled={stage === "initial"}
                  className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
