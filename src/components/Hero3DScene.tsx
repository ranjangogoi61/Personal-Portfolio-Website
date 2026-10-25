import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import type { Mesh } from "three";

function FloatingSphere() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.8) * 0.15;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    ref.current.rotation.y = t * 0.15;
  });
  return (
    <Sphere ref={ref} args={[1.5, 32, 32]}>
      <MeshDistortMaterial
        color="#0ff"
        emissive="#110022"
        metalness={0.6}
        roughness={0.25}
        distort={0.35}
        speed={1.4}
      />
    </Sphere>
  );
}

export default function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.25]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
        stencil: false,
        depth: true,
      }}
      frameloop="always"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} color="#1e1e2f" intensity={1.2} />
      <Suspense fallback={null}>
        <FloatingSphere />
      </Suspense>
    </Canvas>
  );
}
