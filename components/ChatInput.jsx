import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="flex-1 p-2 rounded bg-gray-800"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask your interview question..."
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-600 px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}