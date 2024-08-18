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


import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <>
      <h2 className="text-center text-4xl font-bold text-white mb-10">
        Skills
      </h2>
      <div className='flex flex-row flex-wrap justify-center gap-10 mb-10'>
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
      <p className="text-center text-gray-300 max-w-3xl mx-auto">
        These are some of the key technologies I'm proficient in. My expertise spans across various programming languages, frameworks, and tools, enabling me to tackle diverse projects and challenges in software development.
      </p>
    </>
  );
};

export default SectionWrapper(Tech, "skills");