// import React, { useState, useEffect, useRef } from 'react';
// import { Send, X } from 'lucide-react';

// const ChatWindow = ({ toggleChat }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     setMessages([{ sender: 'bot', message: "Hello! How can I assist you today?" }]);
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (inputMessage.trim() === '') return;

//     const userMessage = { sender: 'user', message: inputMessage };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInputMessage('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           sender: 'user',
//           message: inputMessage,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const botResponses = await response.json();
//       const botMessages = botResponses.map(res => ({ sender: 'bot', message: res.text }));
//       setMessages(prevMessages => [...prevMessages, ...botMessages]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setMessages(prevMessages => [...prevMessages, { sender: 'bot', message: "Sorry, I'm having trouble connecting. Please try again later." }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         <span>AI Assistant</span>
//         <button onClick={toggleChat} className="close-btn">
//           <X size={20} />
//         </button>
//       </div>
//       <div className="chat-body">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>
//             {msg.message}
//           </div>
//         ))}
//         {isLoading && <div className="message bot">Typing...</div>}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="chat-footer">
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage} className="send-btn" disabled={isLoading || inputMessage.trim() === ''}>
//           <Send size={20} />
//         </button>
//       </div>
//       <style jsx>{`
//         .chat-window {
//           position: fixed;
//           bottom: 80px;
//           right: 20px;
//           width: 350px;
//           height: 500px;
//           background-color: #f0f4f8;
//           border-radius: 12px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
//           display: flex;
//           flex-direction: column;
//           font-family: 'Arial', sans-serif;
//           z-index: 1000;
//         }

//         .chat-header {
//           background-color: #4a90e2;
//           color: white;
//           padding: 15px;
//           font-size: 18px;
//           font-weight: bold;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           border-top-left-radius: 12px;
//           border-top-right-radius: 12px;
//         }

//         .close-btn {
//           background: none;
//           border: none;
//           color: white;
//           cursor: pointer;
//           padding: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .chat-body {
//           flex: 1;
//           overflow-y: auto;
//           padding: 20px;
//           display: flex;
//           flex-direction: column;
//         }

//         .message {
//           max-width: 80%;
//           margin-bottom: 15px;
//           padding: 10px 15px;
//           border-radius: 18px;
//           line-height: 1.4;
//           word-wrap: break-word;
//         }

//         .user {
//           align-self: flex-end;
//           background-color: #4a90e2;
//           color: white;
//           border-bottom-right-radius: 4px;
//         }

//         .bot {
//           align-self: flex-start;
//           background-color: #e9eef5;
//           color: #333;
//           border-bottom-left-radius: 4px;
//         }
//   .chat-footer input {
//     flex: 1;
//     border: none;
//     outline: none;
//     padding: 10px;
//     font-size: 16px;
//     border-radius: 20px;
//     background-color: #f0f4f8; /* Make sure background isn't pure white */
//     color: #333; /* Change the text color to a visible one */
//     box-shadow: none; /* Remove shadow to avoid overlapping */
//   }

//   .chat-footer {
//     display: flex;
//     padding: 15px;
//     background-color: white;
//     border-top: 1px solid #e0e0e0;
//     border-bottom-left-radius: 12px;
//     border-bottom-right-radius: 12px;
//     align-items: center; /* Ensure proper alignment */
//   }

//   .chat-footer input::placeholder {
//     color: #999; /* Placeholder text color */
//   }
//         .send-btn {
//           background-color: #4a90e2;
//           color: white;
//           border: none;
//           border-radius: 50%;
//           width: 40px;
//           height: 40px;
//           margin-left: 10px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: background-color 0.3s ease;
//         }

//         .send-btn:hover {
//           background-color: #3a7bc8;
//         }

//         .send-btn:disabled {
//           background-color: #ccc;
//           cursor: not-allowed;
//         }

//         @media (max-width: 768px) {
//           .chat-window {
//             width: 100%;
//             height: 100%;
//             bottom: 0;
//             right: 0;
//             border-radius: 0;
//           }

//           .chat-header {
//             border-radius: 0;
//           }

//           .chat-footer {
//             border-radius: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChatWindow;

// import React, { useState, useEffect, useRef } from 'react';
// import { Send, X } from 'lucide-react';

// const ChatWindow = ({ toggleChat }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     setMessages([{ sender: 'bot', message: "Hello! How can I assist you today?" }]);
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (inputMessage.trim() === '') return;

//     const userMessage = { sender: 'user', message: inputMessage };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInputMessage('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost:5000/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           sender: 'user',
//           message: inputMessage,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const botResponses = await response.json();
//       const botMessages = botResponses.map(res => ({ sender: 'bot', message: res.text }));
//       setMessages(prevMessages => [...prevMessages, ...botMessages]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setMessages(prevMessages => [...prevMessages, { sender: 'bot', message: "Sorry, I'm having trouble connecting. Please try again later." }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         <span>AI Assistant</span>
//         <button onClick={toggleChat} className="close-btn">
//           <X size={20} />
//         </button>
//       </div>
//       <div className="chat-body">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>
//             {msg.message}
//           </div>
//         ))}
//         {isLoading && <div className="message bot">Typing...</div>}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="chat-footer">
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage} className="send-btn" disabled={isLoading || inputMessage.trim() === ''}>
//           <Send size={20} />
//         </button>
//       </div>
//       <style jsx>{`
//         .chat-window {
//           position: fixed;
//           bottom: 80px;
//           right: 20px;
//           width: 350px;
//           height: 500px;
//           background-color: #f0f4f8;
//           border-radius: 12px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
//           display: flex;
//           flex-direction: column;
//           font-family: 'Arial', sans-serif;
//           z-index: 1000;
//         }

//         .chat-header {
//           background-color: #4a90e2;
//           color: white;
//           padding: 15px;
//           font-size: 18px;
//           font-weight: bold;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           border-top-left-radius: 12px;
//           border-top-right-radius: 12px;
//         }

//         .close-btn {
//           background: none;
//           border: none;
//           color: white;
//           cursor: pointer;
//           padding: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .chat-body {
//           flex: 1;
//           overflow-y: auto;
//           padding: 20px;
//           display: flex;
//           flex-direction: column;
//         }

//         .message {
//           max-width: 80%;
//           margin-bottom: 15px;
//           padding: 10px 15px;
//           border-radius: 18px;
//           line-height: 1.4;
//           word-wrap: break-word;
//         }

//         .user {
//           align-self: flex-end;
//           background-color: #4a90e2;
//           color: white;
//           border-bottom-right-radius: 4px;
//         }

//         .bot {
//           align-self: flex-start;
//           background-color: #e9eef5;
//           color: #333;
//           border-bottom-left-radius: 4px;
//         }

//         .chat-footer {
//           display: flex;
//           padding: 15px;
//           background-color: white;
//           border-top: 1px solid #e0e0e0;
//           border-bottom-left-radius: 12px;
//           border-bottom-right-radius: 12px;
//           align-items: center;
//         }

//         .chat-footer input {
//           flex: 1;
//           border: none;
//           outline: none;
//           padding: 10px;
//           font-size: 16px;
//           border-radius: 20px;
//           background-color: #f0f4f8;
//           color: #333;
//           box-shadow: none;
//         }

//         .chat-footer input::placeholder {
//           color: #999;
//         }

//         .send-btn {
//           background-color: #4a90e2;
//           color: white;
//           border: none;
//           border-radius: 50%;
//           width: 40px;
//           height: 40px;
//           margin-left: 10px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: background-color 0.3s ease;
//         }

//         .send-btn:hover {
//           background-color: #3a7bc8;
//         }

//         .send-btn:disabled {
//           background-color: #ccc;
//           cursor: not-allowed;
//         }

//         @media (max-width: 768px) {
//           .chat-window {
//             width: 100%;
//             height: 100%;
//             bottom: 0;
//             right: 0;
//             border-radius: 0;
//           }

//           .chat-header {
//             border-radius: 0;
//           }

//           .chat-footer {
//             border-radius: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChatWindow;


import React, { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';

const ChatWindow = ({ toggleChat }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([{ sender: 'bot', message: "Hello! How can I assist you today?" }]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading && inputMessage.trim() !== '') {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { sender: 'user', message: inputMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://geminichatbot-6fhp.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputMessage
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { 
        sender: 'bot', 
        message: data.response 
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [
        ...prevMessages, 
        { 
          sender: 'bot', 
          message: "Sorry, I'm having trouble connecting. Please try again later." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-window" onClick={(e) => e.stopPropagation()}>
      <div className="chat-header">
        <span>AI Assistant</span>
        <button onClick={(e) => {
          e.stopPropagation();
          toggleChat();
        }} className="close-btn">
          <X size={20} />
        </button>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.message}
          </div>
        ))}
        {isLoading && <div className="message bot">Typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button 
          onClick={sendMessage} 
          className="send-btn" 
          disabled={isLoading || inputMessage.trim() === ''}
        >
          <Send size={20} />
        </button>
      </div>
      <style jsx>{`
        .chat-window {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 350px;
          height: 500px;
          background-color: #f0f4f8;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          font-family: 'Arial', sans-serif;
          z-index: 1000;
        }

        .chat-header {
          background-color: #4a90e2;
          color: white;
          padding: 15px;
          font-size: 18px;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          background-color: #f0f4f8;
        }

        .message {
          max-width: 80%;
          margin-bottom: 15px;
          padding: 10px 15px;
          border-radius: 18px;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .user {
          align-self: flex-end;
          background-color: #4a90e2;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .bot {
          align-self: flex-start;
          background-color: #e9eef5;
          color: #333;
          border-bottom-left-radius: 4px;
        }

        .chat-footer {
          display: flex;
          padding: 15px;
          background-color: white;
          border-top: 1px solid #e0e0e0;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          align-items: center;
          z-index: 1001;
        }

        .chat-footer input {
          flex: 1;
          border: none;
          outline: none;
          padding: 10px;
          font-size: 16px;
          border-radius: 20px;
          background-color: #f0f4f8;
          color: #333;
        }

        .chat-footer input::placeholder {
          color: #999;
        }

        .send-btn {
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-left: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease;
        }

        .send-btn:hover {
          background-color: #3a7bc8;
        }

        .send-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .chat-window {
            width: 100%;
            height: 100%;
            bottom: 0;
            right: 0;
            border-radius: 0;
          }

          .chat-header {
            border-radius: 0;
          }

          .chat-footer {
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatWindow;