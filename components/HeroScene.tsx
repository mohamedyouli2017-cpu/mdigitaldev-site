'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 300;

  const geometry = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++) pos[i] = (Math.random() - 0.5) * 30;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT * 3; i += 3) {
      pos[i]     += (Math.random() - 0.5) * 0.003;
      pos[i + 1] += (Math.random() - 0.5) * 0.003;
      pos[i + 2] += (Math.random() - 0.5) * 0.003;
      if (pos[i]     >  15 || pos[i]     < -15) pos[i]     = (Math.random() - 0.5) * 30;
      if (pos[i + 1] >  15 || pos[i + 1] < -15) pos[i + 1] = (Math.random() - 0.5) * 30;
      if (pos[i + 2] >  15 || pos[i + 2] < -15) pos[i + 2] = (Math.random() - 0.5) * 30;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.4 + Math.sin(clock.elapsedTime * 2) * 0.4;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#ffffff" size={0.025} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ alpha: true, antialias: false }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Stars />
      </Suspense>
    </Canvas>
  );
}
