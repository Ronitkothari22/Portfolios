// import React, { useState } from 'react';

// const ChatBotIcon = ({ toggleChat }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div 
//       className="chat-bot-icon"
//       onClick={toggleChat}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chat-icon">
//         <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//       </svg>
//       <style jsx>{`
//         .chat-bot-icon {
//           position: fixed;
//           bottom: 20px;
//           right: 20px;
//           background-color: #4a90e2;
//           border-radius: 50%;
//           width: 60px;
//           height: 60px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           cursor: pointer;
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
//           transition: all 0.3s ease;
//           z-index: 1000;
//         }

//         .chat-icon {
//           width: 32px;
//           height: 32px;
//           color: #ffffff;
//         }

//         .chat-bot-icon:hover {
//           transform: ${isHovered ? 'scale(1.1)' : 'scale(1)'};
//           box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
//         }

//         @keyframes pulse {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.1); }
//           100% { transform: scale(1); }
//         }

//         .chat-bot-icon {
//           animation: pulse 2s infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChatBotIcon;


import React, { useState } from 'react';

const ChatBotIcon = ({ toggleChat, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  return (
    <div 
      className="chat-bot-icon"
      onClick={toggleChat}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chat-icon">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <style jsx>{`
        .chat-bot-icon {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #4a90e2;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .chat-icon {
          width: 32px;
          height: 32px;
          color: #ffffff;
        }

        .chat-bot-icon:hover {
          transform: ${isHovered ? 'scale(1.1)' : 'scale(1)'};
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .chat-bot-icon {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ChatBotIcon;