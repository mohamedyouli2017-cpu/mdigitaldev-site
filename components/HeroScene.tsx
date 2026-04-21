'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function TorusKnotMesh({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, z: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRotation.current = {
        x: -(e.clientY / window.innerHeight - 0.5) * 0.6,
        z: (e.clientX / window.innerWidth - 0.5) * 0.4,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * (isMobile ? 0.2 : 0.3);
    meshRef.current.rotation.x +=
      (targetRotation.current.x - meshRef.current.rotation.x) * 0.04;
    meshRef.current.rotation.z +=
      (targetRotation.current.z - meshRef.current.rotation.z) * 0.04;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry
        args={[
          1,
          0.35,
          isMobile ? 80 : 128,
          isMobile ? 12 : 20,
        ]}
      />
      <MeshDistortMaterial
        color="#7C3AED"
        distort={isMobile ? 0.25 : 0.38}
        speed={isMobile ? 1.2 : 2}
        roughness={0.08}
        metalness={0.75}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 48 }}
      gl={{ alpha: true, antialias: !isMobile }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#7C3AED" />
      <pointLight position={[-2, -2, 2]} intensity={0.6} color="#a855f7" />
      <Suspense fallback={null}>
        <TorusKnotMesh isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
