"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Record<string, string> = {
  en: "Hi! I'm the MDigitalDev assistant. How can I help you today? 👋",
  fr: "Bonjour! Je suis l'assistant MDigitalDev. Comment puis-je vous aider? 👋",
  ar: "مرحباً! أنا مساعد MDigitalDev. كيفاش نقدر نعاونك اليوم؟ 👋",
};

const PLACEHOLDER: Record<string, string> = {
  en: "Type a message...",
  fr: "Écrivez un message...",
  ar: "اكتب رسالة...",
};

/* Minimal markdown: **bold** and [link](url) */
function parseMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m) {
      return (
        <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className="underline decoration-purple-400 hover:text-purple-300 transition-colors">
          {m[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatWidget() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialized = useRef(false);

  /* Show welcome message once on first open */
  useEffect(() => {
    if (isOpen && !initialized.current) {
      initialized.current = true;
      setMessages([{ role: "assistant", content: WELCOME[lang] ?? WELCOME.en }]);
    }
  }, [isOpen, lang]);

  /* Auto-scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* Focus input when panel opens */
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setIsTyping(true);

    try {
      /* Send last 10 messages as history (excluding the one just added) */
      const history = next.slice(0, -1).slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      const data: { reply?: string; error?: string } = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? data.error ?? "Sorry, I couldn't respond right now." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed bottom-[168px] right-6 z-50 w-[calc(100vw-48px)] max-w-sm"
          >
            <div className="bg-[#111111] border border-white/10 rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col">

              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-700">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-lg select-none">
                  🤖
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm leading-tight">MDigitalDev Assistant</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/70 text-xs">Online</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-auto text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages */}
              <div
                className="flex flex-col gap-3 p-4 overflow-y-auto"
                style={{ maxHeight: "400px" }}
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-violet-600 to-purple-700 text-white rounded-br-sm"
                          : "bg-white/10 text-white/90 rounded-bl-sm"
                      }`}
                    >
                      {parseMarkdown(msg.content)}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-2 h-2 rounded-full bg-white/50 typing-dot"
                          style={{ animationDelay: `${i * 0.18}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                className="flex items-center gap-2 p-3 border-t border-white/10"
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={PLACEHOLDER[lang] ?? PLACEHOLDER.en}
                  disabled={isTyping}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/35 outline-none focus:border-purple-500/70 transition-colors disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white shadow-[0_2px_12px_rgba(139,92,246,0.45)] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                  aria-label="Send"
                >
                  <Send size={15} />
                </motion.button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating toggle button ── */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-[0_4px_24px_rgba(139,92,246,0.55)] hover:shadow-[0_8px_36px_rgba(139,92,246,0.75)] transition-shadow duration-300"
        aria-label={isOpen ? "Close chat" : "Chat with MDigitalDev"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.14 }}
            >
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.14 }}
            >
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
