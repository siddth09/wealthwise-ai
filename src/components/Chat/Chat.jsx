import { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { getChatResponse, getAvatarResponse } from "../../engine/recommendations";
import { motion, AnimatePresence } from "framer-motion";
import "./Chat.css";

export default function Chat() {
  const { state, dispatch } = useApp();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef(null);

  const initialSuggestions = [
    "How is my portfolio doing?",
    "Analyze my spending",
    "Show my goals",
    "Market update",
    "Tax saving tips",
  ];

  useEffect(() => {
    if (state.chatMessages.length === 0) {
      dispatch({
        type: "ADD_CHAT_MESSAGE",
        payload: {
          id: 0,
          type: "bot",
          text: getAvatarResponse("greeting"),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions: initialSuggestions,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [state.chatMessages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      type: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    dispatch({ type: "ADD_CHAT_MESSAGE", payload: userMsg });
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getChatResponse(text);
      const botMsg = {
        id: Date.now() + 1,
        type: "bot",
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions: response.suggestions,
      };
      dispatch({ type: "ADD_CHAT_MESSAGE", payload: botMsg });
      setIsTyping(false);

      // Speak the response using Web Speech API
      if ("speechSynthesis" in window) {
        const plainText = response.text.replace(/\*\*/g, "").replace(/[📈💰🍔⚡💡🤔🏠🎯🛡️📊]/g, "");
        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 0.7;
        const voices = speechSynthesis.getVoices();
        const indianVoice = voices.find(v => v.lang === 'en-IN') || voices.find(v => v.lang.startsWith('en'));
        if (indianVoice) utterance.voice = indianVoice;
        speechSynthesis.speak(utterance);
      }
    }, 800 + Math.random() * 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="chat-page" id="chat-page">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-avatar-header">🤖</div>
        <div className="chat-header-info">
          <h3>WealthWise AI</h3>
          <p>Online • Your Personal Advisor</p>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages" ref={messagesRef}>
        {/* Avatar Intro */}
        {state.chatMessages.length <= 1 && (
          <motion.div
            className="avatar-intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="avatar-large">🤖</div>
            <h2>
              I'm <span className="text-gradient">WealthWise AI</span>
            </h2>
            <p>
              Your personal AI wealth advisor. I can analyze your portfolio, track spending,
              plan goals, and provide smart investment recommendations.
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {state.chatMessages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`chat-message ${msg.type}`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <div className="message-bubble">{msg.text}</div>
              <div className="message-time">{msg.time}</div>
              {msg.suggestions && (
                <div className="chat-suggestions">
                  {msg.suggestions.map((s) => (
                    <button
                      key={s}
                      className="suggestion-chip"
                      onClick={() => sendMessage(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            className="chat-message bot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="message-bubble">
              <div className="typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <input
            className="chat-input"
            id="chat-input"
            type="text"
            placeholder="Ask your AI advisor..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="chat-send-btn"
            id="chat-send-btn"
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
