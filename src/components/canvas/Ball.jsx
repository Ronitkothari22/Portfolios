// import React, { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   Decal,
//   Float,
//   OrbitControls,
//   Preload,
//   useTexture,
// } from "@react-three/drei";

// import CanvasLoader from "../Loader";

// const Ball = (props) => {
//   const [decal] = useTexture([props.imgUrl]);

//   return (
//     <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
//       <ambientLight intensity={0.25} />
//       <directionalLight position={[0, 0, 0.05]} />
//       <mesh castShadow receiveShadow scale={2.75}>
//         <icosahedronGeometry args={[1, 1]} />
//         <meshStandardMaterial
//           color='#fff8eb'
//           polygonOffset
//           polygonOffsetFactor={-5}
//           flatShading
//         />
//         <Decal
//           position={[0, 0, 1]}
//           rotation={[2 * Math.PI, 0, 6.25]}
//           scale={1}
//           map={decal}
//           flatShading
//         />
//       </mesh>
//     </Float>
//   );
// };

// const BallCanvas = ({ icon }) => {
//   return (
//     <Canvas
//       frameloop='demand'
//       dpr={[1, 2]}
//       gl={{ preserveDrawingBuffer: true }}
//     >
//       <Suspense fallback={<CanvasLoader />}>
//         <OrbitControls enableZoom={false} />
//         <Ball imgUrl={icon} />
//       </Suspense>

//       <Preload all />
//     </Canvas>
//   );
// };

// export default BallCanvas;

// import React, { Suspense, useRef, useEffect } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import {
//   Decal,
//   Float,
//   OrbitControls,
//   Preload,
//   useTexture,
// } from "@react-three/drei";
// import * as THREE from 'three';

// import CanvasLoader from "../Loader";

// const Ball = (props) => {
//   const [decal] = useTexture([props.imgUrl]);

//   return (
//     <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
//       <ambientLight intensity={0.25} />
//       <directionalLight position={[0, 0, 0.05]} />
//       <mesh castShadow receiveShadow scale={2.75}>
//         <icosahedronGeometry args={[1, 1]} />
//         <meshStandardMaterial
//           color='#fff8eb'
//           polygonOffset
//           polygonOffsetFactor={-5}
//           flatShading
//         />
//         <Decal
//           position={[0, 0, 1]}
//           rotation={[2 * Math.PI, 0, 6.25]}
//           scale={1}
//           map={decal}
//           flatShading
//         />
//       </mesh>
//     </Float>
//   );
// };

// const ControlledBall = ({ icon }) => {
//   const controlsRef = useRef();
//   const { camera } = useThree();
//   const initialRotation = useRef(new THREE.Euler());
//   const targetRotation = useRef(new THREE.Euler());
//   const isAnimating = useRef(false);

//   useEffect(() => {
//     if (camera) {
//       initialRotation.current.copy(camera.rotation);
//     }
//   }, [camera]);

//   useFrame(() => {
//     if (isAnimating.current && camera) {
//       camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.05;
//       camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.05;
//       camera.rotation.z += (targetRotation.current.z - camera.rotation.z) * 0.05;

//       if (Math.abs(targetRotation.current.x - camera.rotation.x) < 0.001 &&
//           Math.abs(targetRotation.current.y - camera.rotation.y) < 0.001 &&
//           Math.abs(targetRotation.current.z - camera.rotation.z) < 0.001) {
//         isAnimating.current = false;
//       }
//     }
//   });

//   const handlePointerUp = () => {
//     if (camera) {
//       targetRotation.current.copy(initialRotation.current);
//       isAnimating.current = true;
//     }
//   };

//   return (
//     <>
//       <OrbitControls
//         ref={controlsRef}
//         enableZoom={false}
//         enablePan={false}
//         enableDamping={true}
//         dampingFactor={0.05}
//         onPointerUp={handlePointerUp}
//       />
//       <Ball imgUrl={icon} />
//     </>
//   );
// };

// const BallCanvas = ({ icon }) => {
//   return (
//     <Canvas
//       frameloop='always'
//       dpr={[1, 2]}
//       gl={{ preserveDrawingBuffer: true }}
//     >
//       <Suspense fallback={<CanvasLoader />}>
//         <ControlledBall icon={icon} />
//       </Suspense>
//       <Preload all />
//     </Canvas>
//   );
// };

// export default BallCanvas;
import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const controlsRef = useRef();

  const handlePointerUp = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          onEnd={handlePointerUp}
        />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;