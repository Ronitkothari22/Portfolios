// import React from "react";

// import { BallCanvas } from "./canvas";
// import { SectionWrapper } from "../hoc";
// import { technologies } from "../constants";

// const Tech = () => {
//   return (
//     <div className='flex flex-row flex-wrap justify-center gap-10'>
//       {technologies.map((technology) => (
//         <div className='w-28 h-28' key={technology.name}>
//           <BallCanvas icon={technology.icon} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SectionWrapper(Tech, "");


// import React from "react";
// import { BallCanvas } from "./canvas";
// import { SectionWrapper } from "../hoc";
// import { technologies } from "../constants";

// const Tech = () => {
//   return (
//     <>
//       <h2 className="text-center text-4xl font-bold text-white mb-10">
//         Skills
//       </h2>
//       <div className='flex flex-row flex-wrap justify-center gap-10 mb-10'>
//         {technologies.map((technology) => (
//           <div className='w-28 h-28' key={technology.name}>
//             <BallCanvas icon={technology.icon} />
//           </div>
//         ))}
//       </div>
//       <p className="text-center text-gray-300 max-w-3xl mx-auto">
//         These are some of the key technologies I'm proficient in. My expertise spans across various programming languages, frameworks, and tools, enabling me to tackle diverse projects and challenges in software development.
//       </p>
//     </>
//   );
// };

// export default SectionWrapper(Tech, "skills");



import React from "react";
import { motion } from "framer-motion";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const fadeIn = {
  hidden: { opacity: 0, y: -50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

const Tech = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      <motion.h2 
        className="text-center text-4xl font-bold text-white mb-10"
        variants={itemVariant}
      >
        Skills
      </motion.h2>
      <motion.div 
        className='flex flex-row flex-wrap justify-center gap-10 mb-10'
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {technologies.map((technology) => (
          <motion.div 
            className='w-28 h-28' 
            key={technology.name}
            variants={itemVariant}
          >
            <BallCanvas icon={technology.icon} />
          </motion.div>
        ))}
      </motion.div>
      <motion.p 
        className="text-center text-gray-300 max-w-3xl mx-auto"
        variants={itemVariant}
      >
        These are some of the key technologies I'm proficient in. My expertise spans across various programming languages, frameworks, and tools, enabling me to tackle diverse projects and challenges in software development.
      </motion.p>
    </motion.div>
  );
};

export default SectionWrapper(Tech, "skills");