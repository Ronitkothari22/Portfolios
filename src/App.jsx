// import { BrowserRouter } from "react-router-dom";

// import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
// import FancyEffect from "./components/FancyEffect";
// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className='relative z-0 bg-primary'>
//         <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
//         <FancyEffect />
//           <Navbar />
//           <Hero />
//         </div>
//         <About />
//         <Experience />
//         <Tech />
//         <Works />
//         {/* <Feedbacks /> */}
//         <div className='relative z-0'>
//           <Contact />
//           {/* <StarsCanvas /> */}
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import FancyEffect from "./components/FancyEffect";
import ChatWindow from "./components/ChatWindow";
import ChatBotIcon from "./components/ChatbotIcon";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <FancyEffect />
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        {/* <Feedbacks /> */}
        <div className='relative z-0'>
          <Contact />
          {/* <StarsCanvas /> */}
        </div>
        {isChatOpen && <ChatWindow toggleChat={toggleChat} />}
        <ChatBotIcon toggleChat={toggleChat} />
      </div>
    </BrowserRouter>
  );
}

export default App;