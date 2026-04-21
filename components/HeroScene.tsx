'use client';

import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();

  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 10,
        z: Math.random() * 4 - 2,
        vy: 0.004 + Math.random() * 0.012,
        vx: (Math.random() - 0.5) * 0.003,
        size: 0.02 + Math.random() * 0.04,
      })),
    [count],
  );

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const purple = new THREE.Color('#7C3AED');
    const lightPurple = new THREE.Color('#A855F7');
    const white = new THREE.Color('#ffffff');
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      mesh.setColorAt(i, r > 0.55 ? white : r > 0.25 ? lightPurple : purple);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count]);

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
    const mesh = meshRef.current;
    if (!mesh) return;
    const hw = viewport.width * 0.75;
    const hh = viewport.height * 0.75;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      p.y += p.vy;
      p.x += p.vx;
      if (p.y > hh) p.y = -hh;
      if (p.x > hw) p.x = -hw;
      else if (p.x < -hw) p.x = hw;

      // Parallax: near particles (high z) shift more than far ones
      const px = mouse.current.x * (p.z + 2) * 0.06;
      const py = mouse.current.y * (p.z + 2) * 0.06;

      dummy.position.set(p.x + px, p.y + py, p.z);
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial vertexColors />
    </instancedMesh>
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
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ alpha: true, antialias: false }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ParticleField count={isMobile ? 80 : 150} />
      </Suspense>
    </Canvas>
  );
}
