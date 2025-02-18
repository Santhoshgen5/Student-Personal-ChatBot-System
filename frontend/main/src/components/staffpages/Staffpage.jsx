import React, { useState } from "react";
import axios from "axios";

export default function Staffpage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      message: input,
      metadata: {
        username: "santhosh", // Replace with actual username
      },
    };

    // Add user's message to the chat
    setMessages([...messages, { sender: "user", text: input }]);

    try {
      // Send message to Rasa
      const response = await axios.post(
        "http://localhost:5005/webhooks/rest/webhook",
        userMessage
      );

      // Add Rasa's response to the chat
      const botMessages = response.data.map((msg) => ({
        sender: "bot",
        text: msg.text,
      }));

      setMessages((prev) => [...prev, ...botMessages]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <div>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
        }}
      >
        {messages.map((msg, idx) => (
          <p
            key={idx}
            style={{ textAlign: msg.sender === "bot" ? "left" : "right" }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
