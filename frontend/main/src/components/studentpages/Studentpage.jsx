import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import humanlogo from "../../assets/imgs/logos/humanlogo.jpg"

export default function Studentpage({ name, profile, register }) {
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
        console.log("Error response:", error.response.data);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
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
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {profile ? <img src={profile} alt="" height="100px" style={{ borderRadius: "50%" }} /> : <img src={humanlogo} alt="" height="100px" style={{ borderRadius: "50%" }} />}
        <h3>{name}</h3>
        <p style={{ paddingTop: "4px" }}>{register}</p>
      </div>

      {/* Main Chat Section */}
      <div style={styles.mainContent}>

        <span style={{
          marginRight: "90%",
          padding: "13px",
          backgroundColor: "#ECECEC",
          borderRadius: "40%"
        }}> MRG ChatBot</span>
        {/* Chat Display */}
        <div style={getStyles(messages.length > 0).chatBox}>

          <br />
          <br />
          <br />
          <br />
          {messages.length === 0 ? (
            <h2 style={styles.placeholderText}>What can I help with?</h2>
          ) : (
            messages.map((msg) => (
              <p
                key={msg.id}
                style={{
                  textAlign: msg.sender === "bot" ? "left" : "right",
                  padding: "5px 10px",
                }}
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div style={getStyles(messages.length > 0).inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={styles.input}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            style={{
              ...styles.button,
              opacity: input.trim() ? 1 : 0.5,
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
const getStyles = (hasMessages) => ({
  chatBox: {
    height: hasMessages ? "70vh" : "200px",   // Adjust height dynamically
    marginTop: hasMessages ? "0px" : "50px",
    width: "70%",
    overflowY: "auto",
    borderRadius: "10px",
    padding: "20px 40px",
    backgroundColor: "#f9f9f9",
    transition: "height 0.3s ease",          // Smooth transition
  },

  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: hasMessages ? "70%" : "50%",
    marginTop: "10px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    padding: "8px",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
});

const styles = {
  container: {
    display: "flex", // Enables side-by-side layout
    width: "100%",

    height: "100vh", // Adjust height as needed

  },
  sidebar: {
    textAlign: "center",
    minWidth: "150px", // Adjust as needed
    backgroundColor: "#ECECEC",
    borderRight: "1px solid black",
    padding: "20px",
    height: "100%",
    display: "fixed",
  },
  mainContent: {
    flex: 1, // Takes remaining space
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "0 10px 10px 0",
    padding: "20px",
  },


  input: {
    flex: 1,
    padding: "8px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
  button: {
    marginLeft: "10px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },
  placeholderText: {
    color: "#aaa",
    fontStyle: "italic",
    textAlign: "center",
    paddingTop: "5%",
  },
};
