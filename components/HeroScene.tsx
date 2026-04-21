'use client';

import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Reused each frame — safe in single-threaded JS
const tempColor = new THREE.Color();

function StarField({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();

  const stars = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 10,
        z: Math.random() * 4 - 2,
        vy: 0.003 + Math.random() * 0.008,
        vx: (Math.random() - 0.5) * 0.002,
        size: 0.008 + Math.random() * 0.007,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.8 + Math.random() * 2.5,
        isCyan: Math.random() > 0.5,
      })),
    [count],
  );

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

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    const hw = viewport.width * 0.75;
    const hh = viewport.height * 0.75;

    for (let i = 0; i < count; i++) {
      const s = stars[i];
      s.y += s.vy;
      s.x += s.vx;
      if (s.y > hh) s.y = -hh;
      if (s.x > hw) s.x = -hw;
      else if (s.x < -hw) s.x = hw;

      const px = mouse.current.x * (s.z + 2) * 0.06;
      const py = mouse.current.y * (s.z + 2) * 0.06;
      dummy.position.set(s.x + px, s.y + py, s.z);
      dummy.scale.setScalar(s.size);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Twinkle: brightness oscillates between 0.4 and 1.0
      const b = 0.4 + 0.6 * Math.abs(Math.sin(t * s.twinkleSpeed + s.phase));
      if (s.isCyan) {
        tempColor.setRGB(0, b * 0.83, b);
      } else {
        tempColor.setRGB(b, b * 0.95, b);
      }
      mesh.setColorAt(i, tempColor);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
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
        <StarField count={isMobile ? 120 : 200} />
      </Suspense>
    </Canvas>
  );
}
