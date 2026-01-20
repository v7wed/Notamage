import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../lib/axios";

const ChatWithMage = ({ user, onAgentResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'; // Max 120px
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputMessage]);

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Greetings, ${user.Name}! I'm the Mage, I help organize your notes and thoughts, what's on your mind today?`,
        },
      ]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Add user message to chat
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await api.post(
        "/agent/chat",
        {
          conversationHistory: newMessages,
        }
      );

      // Add agent response to chat
      setMessages([
        ...newMessages,
        { role: "assistant", content: response.data.response },
      ]);
    
      onAgentResponse();
      
    } catch (error) {
      console.error("Error chatting with agent:", error.response?.data || error.message);
      
      const errorMessage = "[Network Error] Apologies my powers are fading ... something is wrong let's chat again some other time.";
      
      if (error.response?.data?.details) {
        // Log details for debugging
        console.error("Error details:", error.response.data.details);
      }
      
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Enter without Shift = send message
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    // Shift + Enter = allow new line (default behavior)
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-circle fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 shadow-lg hover:shadow-xl transition-all bg-base-200 border-2 border-red-500 hover:bg-base-300"
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
          <img src="/chat_icon.png" alt="Mage" className="w-9 h-9" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="card fixed bottom-20 md:bottom-24 left-4 right-4 md:left-auto md:right-6 md:w-96 bg-base-100 shadow-2xl z-40 border border-base-300 md:rounded-box rounded-t-box">
          {/* Header */}
          <div className="card-body p-3 md:p-4">
            <div className="flex items-center gap-2 md:gap-3 border-b border-base-300 pb-2 md:pb-3">
              <div className="avatar">
                <div className="rounded-full w-8 md:w-10">
                  <img src="/mage_face.png" alt="Mage" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base md:text-lg">The Mage</h3>
                <p className="text-xs text-base-content/60">
                  Your wise notes assistant
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
                        <div className="rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
                          <img src="/mage_face.png" alt="Mage" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`chat-bubble ${
                      msg.role === "user"
                        ? "bg-neutral text-neutral-content"
                        : "chat-bubble-primary"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none prose-invert">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            // Customize heading sizes for chat
                            h1: ({ ...props }) => <h1 className="text-lg font-bold mb-2" {...props} />,
                            h2: ({ ...props }) => <h2 className="text-base font-bold mb-1.5" {...props} />,
                            h3: ({ ...props }) => <h3 className="text-sm font-bold mb-1" {...props} />,
                            // Customize code blocks
                            code: ({ inline, ...props }) => 
                              inline ? (
                                <code className="bg-base-300/50 px-1.5 py-0.5 rounded text-xs" {...props} />
                              ) : (
                                <code className="block bg-base-300/50 p-2 rounded text-xs overflow-x-auto" {...props} />
                              ),
                            // Customize lists
                            ul: ({ ...props }) => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,
                            ol: ({ ...props }) => <ol className="list-decimal list-inside space-y-1 my-2" {...props} />,
                            // Customize links
                            a: ({ ...props }) => <a className="underline hover:opacity-80" {...props} />,
                            // Customize paragraphs
                            p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                            // Customize blockquotes
                            blockquote: ({ ...props }) => <blockquote className="border-l-2 border-base-300 pl-2 italic my-2" {...props} />,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-8 rounded-full flex items-center justify-center overflow-hidden">
                      <img src="/mage_face.png" alt="Mage" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="chat-bubble chat-bubble-primary">
                    <div className="flex items-center gap-2">
                      <span className="loading loading-dots loading-sm"></span>
                      <span className="text-xs opacity-70">Hmmm...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 pt-2 border-t border-base-300 items-end">
              <textarea
                ref={textareaRef}
                placeholder="Ask The Mage anything..."
                className="textarea textarea-bordered flex-1 resize-none leading-5 min-h-[2.5rem] max-h-[120px] py-2"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                rows={1}
              />
              <button
                onClick={sendMessage}
                className="btn btn-primary btn-sm mb-0.5"
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
