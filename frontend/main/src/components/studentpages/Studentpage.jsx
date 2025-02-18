import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function Studentpage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const userstate = useSelector((state) => state.user);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      message: input,
      metadata: {
        username: userstate.regnum, // Replace with actual username
      },
    };

    // Add user's message to the chat
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: input },
    ]);

    try {
      // Send message to Rasa
      const response = await axios.post(
        "http://localhost:5005/webhooks/rest/webhook",
        userMessage,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Add Rasa's response to the chat
      const botMessages = response.data.map((msg, idx) => ({
        id: Date.now() + idx, // Generate unique ID for each message
        sender: "bot",
        text: msg.text,
      }));
      console.log(response);

      setMessages((prev) => [...prev, ...botMessages]);
    } catch (error) {
      if (error.response) {
        // Server responded with a status outside 2xx range
        console.log("Error response:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.log("No response received:", error.request);
      } else {
        // Something else caused the error
        console.log("Error sending message:", error.message);
      }
    }

    setInput("");
  };

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
        }}
      >
        {messages.map((msg) => (
          <p
            key={msg.id}
            style={{ textAlign: msg.sender === "bot" ? "left" : "right" }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend} disabled={!input.trim()}>
        Send
      </button>
    </div>
  );
}
