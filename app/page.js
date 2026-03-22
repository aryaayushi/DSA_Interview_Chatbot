"use client";

import { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import Suggestions from "../components/Suggestions";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ❗ IMPORTANT
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "bot", text: data.reply },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "bot", text: "Error occurred." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">
        Ace Your SDE Interviews 🚀
      </h1>

      <p className="text-gray-400 mb-4">
        Ask anything about DSA, system design, or HR interviews.
      </p>

      {messages.length === 0 && (
        <Suggestions onClick={sendMessage} />
      )}

      <div className="space-y-3">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} text={msg.text} />
        ))}
      </div>

      {loading && <p className="text-gray-400 mt-2">Thinking...</p>}

      <ChatInput onSend={sendMessage} loading={loading} />
    </div>
  );
}