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
        x: -(e.clientY / window.innerHeight - 0.5) * 1.4,
        z: (e.clientX / window.innerWidth - 0.5) * 1.0,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * (isMobile ? 0.25 : 0.35);
    meshRef.current.rotation.x +=
      (targetRotation.current.x - meshRef.current.rotation.x) * 0.12;
    meshRef.current.rotation.z +=
      (targetRotation.current.z - meshRef.current.rotation.z) * 0.12;
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <torusKnotGeometry
        args={[1, 0.35, isMobile ? 80 : 128, isMobile ? 12 : 20]}
      />
      <MeshDistortMaterial
        color="#A855F7"
        emissive="#7C3AED"
        emissiveIntensity={0.5}
        distort={0.4}
        speed={isMobile ? 2 : 3}
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
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={3} color="#A855F7" />
      <pointLight position={[-3, -2, 2]} intensity={1.5} color="#7C3AED" />
      <pointLight position={[0, -3, -2]} intensity={1.0} color="#EC4899" />
      <Suspense fallback={null}>
        <TorusKnotMesh isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
