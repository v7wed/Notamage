import { useState, useRef, useEffect } from "react";
import api from "../lib/axios";

const ChatWithMage = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize conversation with greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Greetings, ${user.Name}! I'm the Mage, wise and old,
Guardian of the stories you've told.
My name's a secret I'll never betray—
But your notes? Those I'll organize any day!`,
        },
      ]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");

    // Add user message to chat
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token")

      const response = await api.post(
        "/agent/chat",
        {
          conversationHistory: newMessages,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Add agent response to chat
      setMessages([
        ...newMessages,
        { role: "assistant", content: response.data.response },
      ]);
    } catch (error) {
      console.error("Error chatting with agent:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "[Network Error] Apologies... my powers are fading ... something is wrong ... let's chat again some other time.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-circle btn-primary fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-all"
        aria-label="Chat with The Mage"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <span className="text-2xl">🧙‍♂️</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="card fixed bottom-24 right-6 w-96 bg-base-100 shadow-2xl z-40 border border-base-300">
          {/* Header */}
          <div className="card-body p-4">
            <div className="flex items-center gap-3 border-b border-base-300 pb-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-10">
                  <span className="text-xl">🧙‍♂️</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">The Mage</h3>
                <p className="text-xs text-base-content/60">
                  Your magical notes assistant
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-sm btn-circle"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto flex flex-col gap-2 py-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat ${
                    msg.role === "user" ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-image avatar">
                    <div className="w-8 rounded-full">
                      {msg.role === "user" ? (
                        <div className="bg-secondary text-secondary-content rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-sm">{user.Name[0]}</span>
                        </div>
                      ) : (
                        <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-xs">🧙‍♂️</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`chat-bubble ${
                      msg.role === "user"
                        ? "chat-bubble-secondary"
                        : "chat-bubble-primary"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                      <span className="text-xs">🧙‍♂️</span>
                    </div>
                  </div>
                  <div className="chat-bubble chat-bubble-primary">
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 pt-2 border-t border-base-300">
              <input
                type="text"
                placeholder="Ask The Mage anything..."
                className="input input-bordered flex-1 input-sm"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                className="btn btn-primary btn-sm"
                disabled={!inputMessage.trim() || isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWithMage;
