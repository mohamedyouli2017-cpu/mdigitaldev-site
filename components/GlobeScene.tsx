'use client';

import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RADIUS = 1.5;
const DOT_COUNT = 50;
const LINE_PAIRS = 30;

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const dots = useMemo(
    () =>
      Array.from({ length: DOT_COUNT }, () => {
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = 2 * Math.PI * Math.random();
        return {
          position: [
            RADIUS * Math.sin(phi) * Math.cos(theta),
            RADIUS * Math.cos(phi),
            RADIUS * Math.sin(phi) * Math.sin(theta),
          ] as [number, number, number],
          size: 0.02 + Math.random() * 0.02,
          isCyan: Math.random() > 0.4,
        };
      }),
    [],
  );

  const lineGeometry = useMemo(() => {
    const verts: number[] = [];
    for (let i = 0; i < LINE_PAIRS; i++) {
      const a = Math.floor(Math.random() * DOT_COUNT);
      const b = Math.floor(Math.random() * DOT_COUNT);
      if (a !== b) {
        verts.push(...dots[a].position, ...dots[b].position);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, [dots]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x +=
      (mouse.current.y * 0.25 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Dark navy core sphere */}
      <mesh>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#00D4FF"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Cyan wireframe overlay */}
      <mesh>
        <sphereGeometry args={[RADIUS + 0.005, 20, 20]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Surface dots */}
      {dots.map((dot, i) => (
        <mesh key={i} position={dot.position}>
          <sphereGeometry args={[dot.size, 4, 4]} />
          <meshBasicMaterial color={dot.isCyan ? '#00D4FF' : '#ffffff'} />
        </mesh>
      ))}

      {/* Connecting lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 2, 3]} intensity={3} color="#00D4FF" />
      <Suspense fallback={null}>
        <Globe />
      </Suspense>
    </Canvas>
  );
}
